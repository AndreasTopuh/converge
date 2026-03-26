'use client';

import { useState } from 'react';
import MaterialIcon from '@/components/MaterialIcon';
import { brainFeedItems, demoCompany } from '@/data/mockData';

const allTopics = ['All', ...Array.from(new Set(brainFeedItems.map((item) => item.topic)))];

export default function BrainFeedPage() {
  const [activeFilter, setActiveFilter] = useState('All');

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
            Review extracted decisions, the reasoning behind them, and the people
            involved across {demoCompany.name}&apos;s payments, engineering,
            client-ops, and AI research channels.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="psychology_alt" className="header-note-icon" />
          <div>
            <strong>{brainFeedItems.length} signals indexed</strong>
            <span>Updated from the seeded activity inside the {demoCompany.shortName} demo workspace</span>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-bar-copy">
          <p className="section-kicker">Filter by topic</p>
          <h2>Focus the demo feed by decision area.</h2>
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
        {filteredItems.map((item) => (
          <article key={item.id} className="feed-item">
            <div className="feed-item-header">
              <div>
                <div className="feed-decision">{item.decision}</div>
                <div className="feed-reasoning">{item.reasoning}</div>
              </div>

              <span className={`confidence-badge ${item.confidence}`}>
                {item.confidence}
              </span>
            </div>

            <div className="feed-meta">
              <span className="topic-tag">{item.topic}</span>
              <span className="meta-pill">
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
          </article>
        ))}
      </div>
    </div>
  );
}
