'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MaterialIcon from '@/components/MaterialIcon';
import {
  activityLog,
  autoDocs,
  brainFeedItems,
  connectionStats,
  demoCompany,
  suggestedQuestions,
} from '@/data/mockData';

const actionCards = [
  {
    href: '/ask',
    icon: 'search',
    title: 'Ask the Workspace',
    desc: `Search ${demoCompany.shortName} decisions and get answers grounded in the exact conversations that support them.`,
    meta: 'Traceable answers with people, channel, and date context',
    tone: 'accent',
  },
  {
    href: '/auto-docs',
    icon: 'description',
    title: 'Generated Docs',
    desc: `Review SOPs and playbooks generated from the same captured decision history.`,
    meta: 'Published and draft documents in one review queue',
    tone: 'success',
  },
  {
    href: '/connections',
    icon: 'lan',
    title: 'Data Sources',
    desc: 'See which systems feed the workspace today and manage your integration pipeline.',
    meta: 'Slack live today with a clear integration roadmap',
    tone: 'warning',
  },
  {
    href: '/brain-feed',
    icon: 'timeline',
    title: 'Decision Feed',
    desc: `Monitor the latest decisions, reasoning, and stakeholders captured across the workspace.`,
    meta: 'A clean audit trail for strategic decisions',
    tone: 'neutral',
  },
];

function AnimatedStat({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref} className="metric-value">{count.toLocaleString()}</div>;
}

export default function DashboardHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const publishedDocs = autoDocs.filter((doc) => doc.status === 'published').length;

  const dashboardStats = [
    {
      label: 'Messages indexed',
      value: connectionStats.totalMessages,
      note: `From ${connectionStats.activeChannels} active Slack channels`,
      icon: 'mail',
      tone: 'accent',
    },
    {
      label: 'Decisions captured',
      value: connectionStats.decisionsCapture,
      note: 'Ready for search, review, and documentation',
      icon: 'checklist',
      tone: 'success',
    },
    {
      label: 'Published docs',
      value: publishedDocs,
      note: 'SOPs, playbooks, and policy documents',
      icon: 'library_books',
      tone: 'warning',
    },
    {
      label: 'Active channels',
      value: connectionStats.activeChannels,
      note: 'Connected and syncing in real time',
      icon: 'forum',
      tone: 'neutral',
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
            {demoCompany.name} workspace
          </div>

          <h1 className="hero-title">Welcome to your knowledge workspace.</h1>

          <p className="hero-subtitle">
            Ask questions, review captured decisions, and access auto-generated
            documentation — all grounded in your team&apos;s real conversations.
          </p>

          <form className="hero-form" onSubmit={handleSearch}>
            <label className="hero-input-shell" htmlFor="home-query">
              <MaterialIcon icon="search" className="hero-input-icon" />
              <input
                id="home-query"
                type="text"
                className="hero-input"
                placeholder={`Ask about payment migration, onboarding playbook, or AI stack...`}
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
              <p className="panel-kicker">Workspace snapshot</p>
              <h2>Knowledge at a glance</h2>
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
                <AnimatedStat target={stat.value} />
                <p className="metric-note">{stat.note}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Quick access</p>
            <h2>Navigate your workspace.</h2>
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
              <p className="panel-kicker">Decision feed</p>
              <h2>Latest captured decisions</h2>
            </div>
            <Link href="/brain-feed" className="panel-link">
              View all
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
                  <span className="meta-pill channel-pill">
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
              <p className="panel-kicker">Recent activity</p>
              <h2>Live workspace updates</h2>
            </div>
            <MaterialIcon icon="history" className="panel-heading-icon" />
          </div>

          <div className="status-list">
            {activityLog.slice(0, 5).map((item, index) => (
              <div key={item.id} className="status-item" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="status-item-icon">
                  <MaterialIcon icon={item.icon} className="status-icon" />
                </div>
                <div className="status-item-copy">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <span className="status-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
