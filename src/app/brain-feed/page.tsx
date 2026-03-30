'use client';

import { useState } from 'react';
import MaterialIcon from '@/components/MaterialIcon';
import { brainFeedItems, demoCompany } from '@/data/mockData';

const allTopics = ['All', ...Array.from(new Set(brainFeedItems.map((item) => item.topic)))];

export default function BrainFeedPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems =
    activeFilter === 'All'
      ? brainFeedItems
      : brainFeedItems.filter((item) => item.topic === activeFilter);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="page-header-copy">
          <div className="eyebrow">
            <MaterialIcon icon="timeline" className="eyebrow-icon" />
            {demoCompany.shortName} decision stream
          </div>
          <h1>Brain Feed</h1>
          <p>
            A live stream of decisions captured from your team&apos;s conversations.
            Each entry includes the decision, reasoning, people involved, and
            source channel — all extracted automatically by AI.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="psychology_alt" className="header-note-icon" />
          <div>
            <strong>{brainFeedItems.length} decisions captured</strong>
            <span>Click any decision to see full context and details</span>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-bar-copy">
          <p className="section-kicker">Filter by topic</p>
          <h2>Focus on specific decision areas.</h2>
        </div>

        <div className="feed-filters">
          {allTopics.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`filter-btn ${activeFilter === topic ? 'active' : ''}`}
              onClick={() => setActiveFilter(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="feed-list">
        {filteredItems.map((item, index) => {
          const isExpanded = expandedId === item.id;

          return (
            <article
              key={item.id}
              className={`feed-item ${isExpanded ? 'feed-item-expanded' : ''}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <button
                type="button"
                className="feed-item-toggle"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="feed-item-header">
                  <div>
                    <div className="feed-decision">{item.decision}</div>
                    {!isExpanded && (
                      <div className="feed-reasoning">{item.reasoning}</div>
                    )}
                  </div>

                  <div className="feed-item-right">
                    <span className={`confidence-badge ${item.confidence}`}>
                      {item.confidence}
                    </span>
                    <MaterialIcon
                      icon="expand_more"
                      className={`feed-expand-icon ${isExpanded ? 'open' : ''}`}
                    />
                  </div>
                </div>

                <div className="feed-meta">
                  <span className="topic-tag">{item.topic}</span>
                  <span className="meta-pill channel-pill">
                    <MaterialIcon icon="forum" className="meta-pill-icon" />
                    {item.channel}
                  </span>
                  <span className="meta-pill">
                    <MaterialIcon icon="calendar_month" className="meta-pill-icon" />
                    {item.date}
                  </span>
                  <span className="meta-pill">
                    <MaterialIcon icon="group" className="meta-pill-icon" />
                    {item.people.join(', ')}
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="feed-item-detail">
                  <div className="feed-detail-section">
                    <span className="feed-detail-label">Full reasoning</span>
                    <p>{item.reasoning}</p>
                  </div>

                  <div className="feed-detail-section">
                    <span className="feed-detail-label">People involved</span>
                    <div className="feed-people-chips">
                      {item.people.map((person) => (
                        <span key={person} className="feed-person-chip">
                          <span className="feed-person-avatar">{person[0]}</span>
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="feed-detail-section">
                    <span className="feed-detail-label">Source information</span>
                    <div className="feed-source-row">
                      <span className="meta-pill channel-pill">
                        <MaterialIcon icon="forum" className="meta-pill-icon" />
                        {item.channel}
                      </span>
                      <span className="meta-pill">
                        <MaterialIcon icon="calendar_month" className="meta-pill-icon" />
                        {item.date}
                      </span>
                      <span className={`confidence-badge ${item.confidence}`}>
                        {item.confidence} confidence
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
