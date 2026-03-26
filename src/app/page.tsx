import Link from 'next/link';
import MaterialIcon from '@/components/MaterialIcon';
import { autoDocs, brainFeedItems, connectionStats } from '@/data/mockData';

const valueProps = [
  {
    icon: 'forum',
    title: 'Capture decisions from real conversations',
    description:
      'Converge continuously turns team discussions into structured knowledge without forcing a new workflow on the team.',
  },
  {
    icon: 'search',
    title: 'Ask questions against verified context',
    description:
      'Search historical decisions, stakeholders, and rationale with grounded answers linked back to source conversations.',
  },
  {
    icon: 'description',
    title: 'Generate documentation automatically',
    description:
      'Convert recurring decisions into playbooks, SOPs, and operational documents that are clean enough to share with leadership.',
  },
];

const workflowSteps = [
  {
    icon: 'lan',
    title: 'Connect communication channels',
    detail: 'Start with Slack and extend into the systems where strategic decisions already happen.',
  },
  {
    icon: 'timeline',
    title: 'Extract decisions and reasoning',
    detail: 'Converge identifies what changed, why it changed, and who was involved.',
  },
  {
    icon: 'checklist',
    title: 'Operationalize the knowledge',
    detail: 'Use a searchable feed, internal Q&A, and generated documents to keep teams aligned.',
  },
];

export default function PublicHomePage() {
  const publishedDocs = autoDocs.filter((doc) => doc.status === 'published').length;
  const highlightedDecisions = brainFeedItems.slice(0, 3);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link href="/" className="landing-brand">
          <span className="landing-brand-mark">
            <MaterialIcon icon="hub" className="landing-brand-icon" filled />
          </span>
          <span className="landing-brand-copy">
            <strong>CONVERGE</strong>
            <span>Knowledge capture platform</span>
          </span>
        </Link>

        <nav className="landing-nav" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#proof">Proof</a>
        </nav>

        <div className="landing-actions">
          <Link href="/dashboard" className="landing-link">
            Open workspace
          </Link>
          <Link href="/ask" className="landing-button">
            <span>Try the product</span>
            <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
          </Link>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <div className="eyebrow landing-eyebrow">
            <MaterialIcon icon="verified" className="eyebrow-icon" />
            Converge explains what your team has already decided
          </div>

          <h1>
            Give your organization a clear memory of conversations, decisions,
            and operating context.
          </h1>

          <p>
            Converge transforms chat-based discussions into structured
            knowledge. It captures decisions, preserves reasoning, and turns
            that context into searchable answers and polished documentation.
          </p>

          <div className="landing-hero-actions">
            <Link href="/dashboard" className="landing-button">
              <span>View dashboard</span>
              <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
            </Link>
            <Link href="/auto-docs" className="landing-secondary-button">
              <MaterialIcon icon="description" className="landing-secondary-icon" />
              <span>See generated docs</span>
            </Link>
          </div>
        </div>

        <aside className="landing-showcase">
          <div className="landing-showcase-card primary">
            <div className="landing-showcase-head">
              <p className="panel-kicker">At a glance</p>
              <MaterialIcon icon="monitoring" className="panel-heading-icon" />
            </div>
            <div className="landing-stat-grid">
              <div className="landing-stat-card">
                <strong>{connectionStats.totalMessages.toLocaleString()}</strong>
                <span>messages indexed</span>
              </div>
              <div className="landing-stat-card">
                <strong>{connectionStats.decisionsCapture}</strong>
                <span>decisions captured</span>
              </div>
              <div className="landing-stat-card">
                <strong>{publishedDocs}</strong>
                <span>published docs</span>
              </div>
              <div className="landing-stat-card">
                <strong>{connectionStats.activeChannels}</strong>
                <span>active channels</span>
              </div>
            </div>
          </div>

          <div className="landing-showcase-card">
            <div className="landing-showcase-head">
              <p className="panel-kicker">Typical output</p>
              <MaterialIcon icon="description" className="panel-heading-icon" />
            </div>
            <h2>Converge produces answers, feeds, and formal documentation.</h2>
            <p>
              Teams can move from fragmented discussion to a shared,
              presentation-ready understanding of what was decided and why.
            </p>
          </div>
        </aside>
      </section>

      <section id="proof" className="landing-proof">
        <div className="landing-proof-copy">
          <p className="section-kicker">Why it matters</p>
          <h2>Important decisions should not disappear into chat history.</h2>
          <p>
            Converge is designed for organizations that rely on fast-moving
            conversations but still need accountability, clarity, and a usable
            record of operational knowledge.
          </p>
        </div>

        <div className="landing-proof-grid">
          <article className="landing-proof-card">
            <MaterialIcon icon="forum" className="landing-proof-icon" />
            <strong>Conversation-native</strong>
            <p>Works with the discussions teams already have, instead of forcing a separate tool for every decision.</p>
          </article>
          <article className="landing-proof-card">
            <MaterialIcon icon="verified_user" className="landing-proof-icon" />
            <strong>Grounded and reviewable</strong>
            <p>Every answer can stay anchored to channel history, people, and timestamps for fast verification.</p>
          </article>
          <article className="landing-proof-card">
            <MaterialIcon icon="library_books" className="landing-proof-icon" />
            <strong>Ready for business use</strong>
            <p>Outputs are structured for operations, onboarding, compliance, and executive communication.</p>
          </article>
        </div>
      </section>

      <section id="features" className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Core capabilities</p>
            <h2>What Converge helps people do.</h2>
          </div>
        </div>

        <div className="landing-feature-grid">
          {valueProps.map((item) => (
            <article key={item.title} className="landing-feature-card">
              <div className="landing-feature-icon">
                <MaterialIcon icon={item.icon} className="landing-feature-glyph" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">How it works</p>
            <h2>A simple path from discussion to reusable knowledge.</h2>
          </div>
        </div>

        <div className="landing-workflow">
          {workflowSteps.map((step, index) => (
            <article key={step.title} className="landing-step-card">
              <div className="landing-step-index">0{index + 1}</div>
              <div className="landing-step-icon">
                <MaterialIcon icon={step.icon} className="landing-step-glyph" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Recent examples</p>
            <h2>Types of decisions Converge can surface.</h2>
          </div>
        </div>

        <div className="landing-decision-list">
          {highlightedDecisions.map((decision) => (
            <article key={decision.id} className="landing-decision-card">
              <div className="landing-decision-top">
                <span className="topic-tag">{decision.topic}</span>
                <span className={`confidence-badge ${decision.confidence}`}>
                  {decision.confidence}
                </span>
              </div>
              <h3>{decision.decision}</h3>
              <p>{decision.reasoning}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div>
          <p className="section-kicker">See Converge in context</p>
          <h2>Explore the workspace and show people how Converge works.</h2>
          <p>
            Use the dashboard, ask a question, or open generated docs to
            present the product from a clear, business-facing starting point.
          </p>
        </div>

        <div className="landing-cta-actions">
          <Link href="/dashboard" className="landing-button">
            <span>Enter dashboard</span>
            <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
          </Link>
          <Link href="/brain-feed" className="landing-secondary-button">
            <MaterialIcon icon="timeline" className="landing-secondary-icon" />
            <span>Open brain feed</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
