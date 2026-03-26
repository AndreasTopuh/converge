'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MaterialIcon from '@/components/MaterialIcon';
import {
  autoDocs,
  brainFeedItems,
  connectionStats,
  suggestedQuestions,
} from '@/data/mockData';

const actionCards = [
  {
    href: '/ask',
    icon: 'search',
    title: 'Query Knowledge',
    desc: 'Search captured team decisions and get answers grounded in source conversations.',
    meta: 'Traceable answers with source context',
    tone: 'accent',
  },
  {
    href: '/auto-docs',
    icon: 'description',
    title: 'Generate SOPs',
    desc: 'Turn recurring decisions into structured documents that are ready to review and share.',
    meta: 'Drafts and published docs in one place',
    tone: 'success',
  },
  {
    href: '/connections',
    icon: 'lan',
    title: 'Manage Integrations',
    desc: 'Keep Slack and future data sources aligned so Converge stays current and reliable.',
    meta: 'Operational sync across active channels',
    tone: 'warning',
  },
  {
    href: '/brain-feed',
    icon: 'timeline',
    title: 'Review Brain Feed',
    desc: 'Monitor the latest decisions, reasoning, and stakeholders captured across your workspace.',
    meta: 'A clean audit trail for strategic decisions',
    tone: 'neutral',
  },
];

export default function DashboardHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const publishedDocs = autoDocs.filter((doc) => doc.status === 'published').length;

  const dashboardStats = [
    {
      label: 'Messages indexed',
      value: connectionStats.totalMessages.toLocaleString(),
      note: 'Captured across active workspace channels',
      icon: 'mail',
      tone: 'accent',
    },
    {
      label: 'Decisions captured',
      value: connectionStats.decisionsCapture.toString(),
      note: 'Ready for search, review, and reporting',
      icon: 'checklist',
      tone: 'success',
    },
    {
      label: 'Published docs',
      value: publishedDocs.toString(),
      note: 'Governed knowledge ready to share',
      icon: 'library_books',
      tone: 'warning',
    },
    {
      label: 'Active channels',
      value: connectionStats.activeChannels.toString(),
      note: 'Live sources keeping the workspace fresh',
      icon: 'forum',
      tone: 'neutral',
    },
  ];

  const operationalChecks = [
    {
      icon: 'sync',
      title: 'Latest sync',
      detail: 'Slack workspace refreshed 2 minutes ago',
    },
    {
      icon: 'verified_user',
      title: 'Source confidence',
      detail: '89 captured decisions include linked reasoning and owners',
    },
    {
      icon: 'description',
      title: 'Documentation coverage',
      detail: `${publishedDocs} published playbooks available for review`,
    },
  ];

  const recentInsights = brainFeedItems.slice(0, 3);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    router.push(`/ask?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="dashboard-home">
      <section className="surface-panel hero-panel">
        <div className="hero-copy">
          <div className="eyebrow">
            <MaterialIcon icon="verified" className="eyebrow-icon" />
            Executive-ready knowledge workspace
          </div>

          <h1 className="hero-title">
            Turn team conversations into decisions, documents, and dependable
            answers.
          </h1>

          <p className="hero-subtitle">
            Converge centralizes operational context from chat, structures it
            into searchable knowledge, and presents outcomes in a format that is
            clean enough for business review.
          </p>

          <form className="hero-form" onSubmit={handleSearch}>
            <label className="hero-input-shell" htmlFor="home-query">
              <MaterialIcon icon="search" className="hero-input-icon" />
              <input
                id="home-query"
                type="text"
                className="hero-input"
                placeholder="Ask about onboarding, architecture, or recent decisions"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <button
              type="submit"
              className="hero-submit"
              disabled={!query.trim()}
            >
              <span>Ask Converge</span>
              <MaterialIcon icon="arrow_outward" className="button-icon" />
            </button>
          </form>

          <div className="hero-prompts">
            {suggestedQuestions.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="hero-prompt"
                onClick={() =>
                  router.push(`/ask?q=${encodeURIComponent(prompt)}`)
                }
              >
                <MaterialIcon
                  icon="subdirectory_arrow_right"
                  className="prompt-icon"
                />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="hero-aside">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">System snapshot</p>
              <h2>Operational visibility</h2>
            </div>
            <MaterialIcon icon="monitoring" className="panel-heading-icon" />
          </div>

          <div className="hero-metrics">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className={`metric-card ${stat.tone}`}>
                <div className="metric-card-head">
                  <div className="metric-card-icon">
                    <MaterialIcon icon={stat.icon} className="metric-icon" />
                  </div>
                  <span className="metric-label">{stat.label}</span>
                </div>
                <div className="metric-value">{stat.value}</div>
                <p className="metric-note">{stat.note}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Core workflows</p>
            <h2>Operate knowledge through a single, consistent interface.</h2>
          </div>
        </div>

        <div className="action-grid">
          {actionCards.map((card) => (
            <Link key={card.href} href={card.href} className="action-card">
              <div className="action-card-top">
                <div className={`action-icon ${card.tone}`}>
                  <MaterialIcon icon={card.icon} className="action-icon-glyph" />
                </div>
                <MaterialIcon
                  icon="arrow_outward"
                  className="action-link-icon"
                />
              </div>

              <div className="action-card-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>

              <div className="action-card-meta">
                <MaterialIcon
                  icon="check_circle"
                  className="meta-inline-icon"
                />
                <span>{card.meta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-columns">
        <div className="surface-panel dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Recent knowledge</p>
              <h2>Latest decision signals</h2>
            </div>
            <Link href="/brain-feed" className="panel-link">
              View feed
              <MaterialIcon icon="arrow_forward" className="panel-link-icon" />
            </Link>
          </div>

          <div className="activity-list">
            {recentInsights.map((item) => (
              <article key={item.id} className="activity-item">
                <div className="activity-top">
                  <div>
                    <h3 className="activity-title">{item.decision}</h3>
                    <p className="activity-text">{item.reasoning}</p>
                  </div>
                  <span className={`confidence-badge ${item.confidence}`}>
                    {item.confidence}
                  </span>
                </div>

                <div className="activity-meta">
                  <span className="topic-tag">{item.topic}</span>
                  <span className="meta-pill">
                    <MaterialIcon icon="forum" className="meta-pill-icon" />
                    {item.channel}
                  </span>
                  <span className="meta-pill">
                    <MaterialIcon
                      icon="calendar_month"
                      className="meta-pill-icon"
                    />
                    {item.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="surface-panel dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Readiness</p>
              <h2>What the workspace can support today</h2>
            </div>
            <MaterialIcon icon="shield" className="panel-heading-icon" />
          </div>

          <div className="status-list">
            {operationalChecks.map((item) => (
              <div key={item.title} className="status-item">
                <div className="status-item-icon">
                  <MaterialIcon icon={item.icon} className="status-icon" />
                </div>
                <div className="status-item-copy">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
