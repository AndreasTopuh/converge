'use client';

import React, { useState } from 'react';
import MaterialIcon from '@/components/MaterialIcon';
import { autoDocs, demoCompany } from '@/data/mockData';

const formatInline = (value: string) =>
  value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

const renderTable = (headers: string[], rows: string[][], key: number) => (
  <div key={`table-${key}`} className="doc-table-wrap">
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={`${header}-${index}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const renderContent = (content: string) => {
  const lines = content.split('\n');
  const elements: React.JSX.Element[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: { key: number; html: string }[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (!listType || listItems.length === 0) {
      return;
    }

    const items = listItems;
    const key = `list-${items[0].key}`;

    if (listType === 'ul') {
      elements.push(
        <ul key={key}>
          {items.map((item) => (
            <li
              key={item.key}
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={key}>
          {items.map((item) => (
            <li
              key={item.key}
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
          ))}
        </ol>
      );
    }

    listType = null;
    listItems = [];
  };

  const flushTable = (key: number) => {
    if (!inTable) {
      return;
    }

    elements.push(renderTable(tableHeaders, tableRows, key));
    inTable = false;
    tableHeaders = [];
    tableRows = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushTable(index);
      return;
    }

    const isTableRow = trimmed.startsWith('|') && trimmed.endsWith('|');
    const isSeparator = isTableRow && /^\|[\s\-:|]+\|$/.test(trimmed);

    if (isTableRow) {
      flushList();

      const cells = trimmed
        .split('|')
        .filter((cell) => cell.trim())
        .map((cell) => cell.trim());

      if (!isSeparator) {
        if (!inTable) {
          tableHeaders = cells;
          inTable = true;
        } else {
          tableRows.push(cells);
        }
      }

      return;
    }

    flushTable(index);

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={index}>{trimmed.replace('### ', '')}</h3>);
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={index}>{trimmed.replace('## ', '')}</h2>);
      return;
    }

    const bulletMatch = trimmed.match(/^- (.*)$/);
    if (bulletMatch) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }

      listItems.push({
        key: index,
        html: formatInline(bulletMatch[1]),
      });
      return;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s(.*)$/);
    if (orderedMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }

      listItems.push({
        key: index,
        html: formatInline(orderedMatch[1]),
      });
      return;
    }

    flushList();
    elements.push(
      <p
        key={index}
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  });

  flushList();
  flushTable(999);

  return elements;
};

export default function AutoDocsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDoc = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="page-header-copy">
          <div className="eyebrow">
            <MaterialIcon icon="description" className="eyebrow-icon" />
            {demoCompany.shortName} generated documentation
          </div>
          <h1>Auto Docs</h1>
          <p>
            Review generated SOPs and structured documentation compiled from the
            decisions captured inside the {demoCompany.name} sample workspace.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="auto_stories" className="header-note-icon" />
          <div>
            <strong>{autoDocs.length} documents available</strong>
            <span>Payments, onboarding, and governance docs are organized in one review queue</span>
          </div>
        </div>
      </div>

      <div className="docs-list">
        {autoDocs.map((doc) => {
          const isExpanded = expandedId === doc.id;
          const isPublished = doc.status === 'published';

          return (
            <article
              key={doc.id}
              className={`doc-card ${isExpanded ? 'expanded' : ''}`}
            >
              <button
                type="button"
                className="doc-card-header"
                onClick={() => toggleDoc(doc.id)}
              >
                <div className="doc-card-summary">
                  <div className={`doc-icon-wrap ${doc.status}`}>
                    <MaterialIcon
                      icon={isPublished ? 'article' : 'edit_note'}
                      className="doc-icon"
                    />
                  </div>

                  <div className="doc-copy">
                    <div className="doc-title">{doc.title}</div>
                    <div className="doc-description">{doc.description}</div>

                    <div className="doc-meta-row">
                      <span className="meta-pill">
                        <MaterialIcon
                          icon="calendar_month"
                          className="meta-pill-icon"
                        />
                        {doc.generatedDate}
                      </span>
                      <span className="meta-pill">
                        <MaterialIcon
                          icon="attachment"
                          className="meta-pill-icon"
                        />
                        {doc.sourceCount} sources
                      </span>
                    </div>
                  </div>
                </div>

                <div className="doc-card-actions">
                  <span
                    className={`status-badge ${
                      isPublished ? 'connected' : 'coming-soon'
                    }`}
                  >
                    <MaterialIcon
                      icon={isPublished ? 'check_circle' : 'draft'}
                      className="status-badge-icon"
                    />
                    {isPublished ? 'Published' : 'Draft'}
                  </span>

                  <MaterialIcon
                    icon="expand_more"
                    className={`expand-icon ${isExpanded ? 'open' : ''}`}
                  />
                </div>
              </button>

              {isExpanded && <div className="doc-content">{renderContent(doc.content)}</div>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
