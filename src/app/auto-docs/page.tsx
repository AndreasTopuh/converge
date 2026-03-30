'use client';

import React, { useEffect, useState } from 'react';
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

const generateSteps = [
  'Analyzing captured decisions from workspace...',
  'Extracting key themes and stakeholder context...',
  'Structuring document sections and formatting...',
  'Finalizing document with source references...',
];

export default function AutoDocsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStep, setGeneratingStep] = useState(0);
  const [showGenerated, setShowGenerated] = useState(false);

  const toggleDoc = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratingStep(0);
  };

  useEffect(() => {
    if (!isGenerating) return;

    if (generatingStep < generateSteps.length) {
      const timer = setTimeout(() => {
        setGeneratingStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }

    const doneTimer = setTimeout(() => {
      setIsGenerating(false);
      setShowGenerated(true);
    }, 500);
    return () => clearTimeout(doneTimer);
  }, [isGenerating, generatingStep]);

  const publishedCount = autoDocs.filter((d) => d.status === 'published').length;
  const reviewCount = autoDocs.filter((d) => d.status === 'review').length;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="page-header-copy">
          <div className="eyebrow">
            <MaterialIcon icon="description" className="eyebrow-icon" />
            {demoCompany.shortName} documentation
          </div>
          <h1>Auto Docs</h1>
          <p>
            SOPs, playbooks, and policy documents generated automatically from
            your captured decisions. Every document stays linked to its source
            conversations and gets updated when new decisions are captured.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="auto_stories" className="header-note-icon" />
          <div>
            <strong>{autoDocs.length} documents available</strong>
            <span>{publishedCount} published · {reviewCount} in review</span>
          </div>
        </div>
      </div>

      <div className="docs-action-bar">
        <button
          type="button"
          className="docs-generate-btn"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          <MaterialIcon icon="auto_stories" className="docs-generate-icon" />
          <span>{isGenerating ? 'Generating...' : 'Generate new document'}</span>
        </button>

        <div className="docs-stats">
          <span className="docs-stat">
            <MaterialIcon icon="check_circle" className="docs-stat-icon published" />
            {publishedCount} Published
          </span>
          <span className="docs-stat">
            <MaterialIcon icon="history" className="docs-stat-icon review" />
            {reviewCount} In Review
          </span>
        </div>
      </div>

      {isGenerating && (
        <div className="docs-generating surface-panel">
          <div className="docs-generating-head">
            <MaterialIcon icon="psychology_alt" className="docs-generating-spinner" />
            <div>
              <strong>AI is generating a new document</strong>
              <span>Analyzing workspace decisions and structuring content...</span>
            </div>
          </div>
          <div className="docs-generating-steps">
            {generateSteps.map((step, index) => (
              <div
                key={step}
                className={`docs-generating-step ${index < generatingStep ? 'done' : ''} ${index === generatingStep ? 'active' : ''}`}
              >
                <MaterialIcon
                  icon={index < generatingStep ? 'check_circle' : 'search'}
                  className="docs-generating-step-icon"
                />
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="ask-loading-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      )}

      {showGenerated && (
        <article className="doc-card generated-highlight expanded">
          <div className="doc-card-header" style={{ cursor: 'default' }}>
            <div className="doc-card-summary">
              <div className="doc-icon-wrap draft">
                <MaterialIcon icon="auto_stories" className="doc-icon" />
              </div>
              <div className="doc-copy">
                <div className="doc-title">
                  <span className="generated-badge">Just generated</span>
                  Northstar Monorepo Migration Guide
                </div>
                <div className="doc-description">
                  Technical migration guide covering the transition from multi-repo to Turborepo monorepo structure, including CI/CD pipeline changes and team workflow updates.
                </div>
                <div className="doc-meta-row">
                  <span className="meta-pill">
                    <MaterialIcon icon="calendar_month" className="meta-pill-icon" />
                    {new Date().toISOString().split('T')[0]}
                  </span>
                  <span className="meta-pill">
                    <MaterialIcon icon="attachment" className="meta-pill-icon" />
                    6 sources
                  </span>
                </div>
              </div>
            </div>
            <div className="doc-card-actions">
              <span className="status-badge coming-soon">
                <MaterialIcon icon="draft" className="status-badge-icon" />
                Draft
              </span>
            </div>
          </div>
          <div className="doc-content">
            <h2>1. Migration Overview</h2>
            <p>This guide covers Northstar Commerce&apos;s transition from a multi-repository structure to a unified <strong>Turborepo monorepo</strong> for all frontend services.</p>
            <h2>2. Key Changes</h2>
            <ul>
              <li>All frontend packages consolidated under a single repository</li>
              <li>Shared configurations for TypeScript, ESLint, and build tools</li>
              <li>Incremental CI builds using Turborepo caching (target: under 4 minutes)</li>
              <li>Unified dependency management with single lockfile</li>
            </ul>
            <h2>3. Decision Rationale</h2>
            <p>Cross-repo dependency issues were costing the team <strong>2–3 hours per week</strong>. Turborepo was chosen over Nx for its simplicity and native Vercel integration.</p>
            <h2>4. Source Trace</h2>
            <p>Decision captured in <strong>#engineering</strong> on March 15, 2026 by Andreas and Daniel.</p>
          </div>
        </article>
      )}

      <div className="docs-list">
        {autoDocs.map((doc) => {
          const isExpanded = expandedId === doc.id;
          const isPublished = doc.status === 'published';
          const isReview = doc.status === 'review';

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
                      icon={isPublished ? 'article' : isReview ? 'history' : 'edit_note'}
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
                      isPublished ? 'connected' : isReview ? 'review-badge' : 'coming-soon'
                    }`}
                  >
                    <MaterialIcon
                      icon={isPublished ? 'check_circle' : isReview ? 'history' : 'draft'}
                      className="status-badge-icon"
                    />
                    {isPublished ? 'Published' : isReview ? 'In Review' : 'Draft'}
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
