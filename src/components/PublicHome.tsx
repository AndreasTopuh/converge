'use client';

import { FormEvent, startTransition, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import MaterialIcon from '@/components/MaterialIcon';
import BrandMark from '@/components/BrandMark';
import {
  connectionStats,
} from '@/data/mockData';

const trustGroups = [
  'Founders and CEOs',
  'Chiefs of staff',
  'Product leads',
  'Operations teams',
  'Internal AI teams',
];

const useCases = [
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

const productSurfaces = [
  {
    href: '/ask',
    icon: 'search',
    title: 'Ask',
    description:
      'Get sourced answers grounded in people, channels, and dates from your workspace.',
    meta: 'AI-powered Q&A with full source tracing',
  },
  {
    href: '/brain-feed',
    icon: 'timeline',
    title: 'Brain Feed',
    description:
      'A live stream of extracted decisions, reasoning, and stakeholders from your conversations.',
    meta: 'Real-time decision intelligence feed',
  },
  {
    href: '/auto-docs',
    icon: 'description',
    title: 'Auto Docs',
    description:
      'SOPs, playbooks, and governance documents auto-generated from captured decisions.',
    meta: 'Business-ready documentation on autopilot',
  },
  {
    href: '/connections',
    icon: 'lan',
    title: 'Connections',
    description:
      'Connect Slack today and expand to Gmail, Notion, Jira, and more as your team grows.',
    meta: 'Start with Slack, scale to the full enterprise',
  },
];

const heroHighlights = [
  {
    icon: 'check_circle',
    title: 'Sourced answers',
    description:
      'Every answer keeps the source conversation, people, and date visible.',
  },
  {
    icon: 'description',
    title: 'Shareable docs',
    description:
      'Turn recurring decisions into SOPs, onboarding guides, and review-ready documents.',
  },
  {
    icon: 'lan',
    title: 'Slack-first capture',
    description:
      'Start with live chat data and expand into a broader enterprise knowledge layer.',
  },
];

const demoLoopSteps = [
  'Slack threads synced and filtered',
  'Reasoning extracted with source context',
  'Answer routed to Ask with citations',
  'Auto Docs published from the same decisions',
];

const pilotFeedback = [
  {
    quote:
      'We stopped losing key operating decisions in Slack threads. Converge turned our internal context into something leadership could actually review.',
    name: 'Operations lead',
    company: 'B2B SaaS team',
  },
  {
    quote:
      'The value was immediate for onboarding. New team members could search why decisions were made instead of asking around for context.',
    name: 'Chief of staff',
    company: 'Distributed services company',
  },
  {
    quote:
      'Auto Docs made the product feel real because it translated chat history into something formal and presentation-ready.',
    name: 'Product manager',
    company: 'Early-stage platform team',
  },
];

const rolloutPlans = [
  {
    title: 'Starter',
    subtitle: 'For a single team validating internal fit',
    price: 'Free',
    period: 'for up to 5 users',
    features: [
      'Slack workspace integration',
      'Decision feed and source linking',
      'Up to 500 messages per month',
    ],
  },
  {
    title: 'Growth',
    subtitle: 'For teams scaling shared context across the organization',
    price: '$12',
    period: 'per user / month',
    features: [
      'Unlimited messages and channels',
      'Auto Docs and governance views',
      'Priority onboarding and support',
    ],
    featured: true,
  },
  {
    title: 'Enterprise',
    subtitle: 'For regulated or high-context organizations',
    price: 'Custom',
    period: 'annual contract',
    features: [
      'Advanced security and SSO',
      'Custom integrations and workflows',
      'Dedicated success manager',
    ],
  },
];

const faqItems = [
  {
    question: 'Who is Converge built for?',
    answer:
      'Converge is designed for teams that already coordinate in chat and need a cleaner operating memory for decisions, handoffs, and documentation. It works best for operations, product, engineering, and leadership teams.',
  },
  {
    question: 'Does this replace our existing tools?',
    answer:
      'No. Converge is a layer on top of systems like Slack so teams can keep working in familiar channels while the platform structures what matters into searchable, reusable knowledge.',
  },
  {
    question: 'How does the AI work?',
    answer:
      'Converge uses a dual-model pipeline: fast classification identifies decision-relevant threads, then a reasoning model extracts the decision, rationale, stakeholders, and context. Every answer stays grounded in source evidence.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most teams are up and running within 15 minutes. Connect your Slack workspace, select the channels to monitor, and Converge begins capturing decisions immediately.',
  },
];

const roleOptions = [
  'Founder or leadership',
  'Operations',
  'Product or engineering',
  'Customer success',
  'Knowledge or AI team',
];

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
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

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

export default function PublicHome() {
  const publishedDocs = 4;
  const heroFacts = [
    { value: connectionStats.totalMessages, label: 'messages indexed' },
    { value: connectionStats.decisionsCapture, label: 'captured decisions' },
    { value: publishedDocs, label: 'published docs' },
  ];

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    company: '',
    role: roleOptions[0],
  });
  const [signupState, setSignupState] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [signupMessage, setSignupMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!signupForm.name || !signupForm.email || !signupForm.company) {
      return;
    }

    setSignupState('submitting');

    window.setTimeout(() => {
      startTransition(() => {
        const firstName = signupForm.name.trim().split(/\s+/)[0] || 'there';

        setSignupState('success');
        setSignupMessage(
          `Thanks, ${firstName}! We'll reach out to ${signupForm.email} within 24 hours to get you set up.`
        );
        setSignupForm({
          name: '',
          email: '',
          company: '',
          role: roleOptions[0],
        });
      });
    }, 900);
  };

  return (
    <div className="landing-page">
      <div className="landing-orb landing-orb-one" aria-hidden="true" />
      <div className="landing-orb landing-orb-two" aria-hidden="true" />

      <header className="landing-header">
        <Link href="/" className="landing-brand">
          <span className="landing-brand-mark">
            <BrandMark className="brand-mark-image" />
          </span>
          <span className="landing-brand-copy">
            <strong>CONVERGE</strong>
            <span>Knowledge capture platform</span>
          </span>
        </Link>

        <nav className="landing-nav" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#surfaces">Product</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="landing-actions">
          <Link href="/dashboard" className="landing-link">
            Open workspace
          </Link>
          <a href="#signup" className="landing-button">
            <span>Get started free</span>
            <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
          </a>
        </div>
      </header>

      <section className="landing-hero landing-hero-expanded">
        <div className="landing-hero-copy">
          <div className="eyebrow landing-eyebrow">
            <MaterialIcon icon="verified" className="eyebrow-icon" />
            AI-powered knowledge capture for chat-first teams
          </div>

          <h1>Turn chat into sourced answers and company knowledge.</h1>

          <p>
            Converge captures decisions from team conversations, preserves the reasoning
            behind them, and turns everything into searchable answers and structured
            documentation — so nothing important gets lost in chat history.
          </p>

          <div className="landing-hero-facts">
            {heroFacts.map((fact) => (
              <div key={fact.label} className="landing-hero-fact">
                <strong><AnimatedCounter target={fact.value} /></strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>

          <div className="landing-hero-highlights">
            {heroHighlights.map((item) => (
              <article key={item.title} className="landing-highlight">
                <div className="landing-highlight-icon">
                  <MaterialIcon icon={item.icon} className="landing-highlight-glyph" />
                </div>
                <div className="landing-highlight-copy">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="landing-hero-actions">
            <a href="#signup" className="landing-button">
              <span>Start free trial</span>
              <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
            </a>
            <Link href="/dashboard" className="landing-secondary-button">
              <MaterialIcon icon="space_dashboard" className="landing-secondary-icon" />
              <span>Try live demo</span>
            </Link>
          </div>

          <div className="landing-trust-strip">
            <span className="landing-trust-label">Built for:</span>
            <div className="landing-trust-list">
              {trustGroups.map((group) => (
                <span key={group} className="landing-trust-chip">
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="landing-showcase">
          <div className="landing-showcase-card primary">
            <div className="landing-showcase-head">
              <div>
                <p className="panel-kicker">How it works</p>
                <h2>From chat to structured knowledge</h2>
                <p>See how Converge transforms everyday team conversations into a searchable system of record.</p>
              </div>
              <MaterialIcon icon="monitoring" className="panel-heading-icon" />
            </div>

            <div className="landing-stat-grid compact">
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

          <article className="landing-preview-card wide landing-preview-motion-card">
            <div className="landing-preview-head">
              <span className="landing-mini-label">Live product pipeline</span>
              <MaterialIcon icon="monitoring" className="landing-mini-icon" />
            </div>

            <div className="landing-preview-visual">
              <div className="landing-preview-motion">
                <div className="landing-preview-motion-head">
                  <strong>Knowledge capture loop</strong>
                  <span className="landing-live-indicator">
                    <span className="landing-live-dot" />
                    Active
                  </span>
                </div>

                <p className="landing-preview-motion-copy">
                  Conversations flow through AI classification, reasoning extraction,
                  and become searchable answers and reusable documentation — automatically.
                </p>

                <div className="landing-preview-motion-list">
                  {demoLoopSteps.map((step) => (
                    <div key={step} className="landing-preview-motion-step">
                      <MaterialIcon
                        icon="check_circle"
                        className="landing-preview-motion-icon"
                      />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="landing-preview-motion-foot">
                  <span className="landing-preview-foot-pill">Real-time sync</span>
                  <span className="landing-preview-foot-pill">Source citations</span>
                  <span className="landing-preview-foot-pill">Auto documentation</span>
                </div>

                <div className="landing-preview-progress" aria-hidden="true">
                  <span />
                </div>
              </div>
            </div>
          </article>
        </aside>
      </section>

      <section className="landing-proof landing-proof-plain">
        <div className="landing-proof-copy">
          <p className="section-kicker">Why teams choose Converge</p>
          <h2>Important decisions should not vanish into chat history.</h2>
          <p>
            Converge is for teams that already run on chat but need a system of record
            for decisions, rationale, and knowledge transfer.
          </p>
        </div>

        <div className="landing-proof-grid">
          <article className="landing-proof-card">
            <MaterialIcon icon="forum" className="landing-proof-icon" />
            <strong>Conversation-native</strong>
            <p>
              Works with the discussions teams already have, instead of forcing a
              separate tool for every decision.
            </p>
          </article>
          <article className="landing-proof-card">
            <MaterialIcon icon="verified_user" className="landing-proof-icon" />
            <strong>Grounded and reviewable</strong>
            <p>
              Every answer stays anchored to channel history, people, and timestamps
              for fast verification.
            </p>
          </article>
          <article className="landing-proof-card">
            <MaterialIcon icon="library_books" className="landing-proof-icon" />
            <strong>Ready for business use</strong>
            <p>
              Outputs are structured for operations, onboarding, compliance, and
              executive communication.
            </p>
          </article>
        </div>
      </section>

      <section id="features" className="landing-section landing-section-plain">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Core capabilities</p>
            <h2>Everything your team needs to capture and use knowledge.</h2>
          </div>
        </div>

        <div className="landing-feature-list">
          {useCases.map((item, index) => (
            <article key={item.title} className="landing-feature-row">
              <div className="landing-feature-row-index">{`0${index + 1}`}</div>
              <div className="landing-feature-icon">
                <MaterialIcon icon={item.icon} className="landing-feature-glyph" />
              </div>
              <div className="landing-feature-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="surfaces" className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Product surfaces</p>
            <h2>Four integrated views to capture, search, and share knowledge.</h2>
          </div>
        </div>

        <div className="landing-surface-grid">
          {productSurfaces.map((surface) => (
            <Link key={surface.href} href={surface.href} className="landing-surface-card">
              <div className="landing-surface-top">
                <div className="landing-surface-icon">
                  <MaterialIcon icon={surface.icon} className="landing-surface-glyph" />
                </div>
                <MaterialIcon icon="arrow_outward" className="landing-surface-arrow" />
              </div>
              <h3>{surface.title}</h3>
              <p>{surface.description}</p>
              <div className="landing-surface-meta">
                <MaterialIcon icon="check_circle" className="meta-inline-icon" />
                <span>{surface.meta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">What teams are saying</p>
            <h2>Real feedback from early adopters.</h2>
          </div>
        </div>

        <div className="landing-quote-grid">
          {pilotFeedback.map((item) => (
            <article key={`${item.name}-${item.company}`} className="landing-quote-card">
              <p className="landing-quote-mark">&ldquo;</p>
              <p className="landing-quote-text">{item.quote}</p>
              <div className="landing-quote-author">
                <strong>{item.name}</strong>
                <span>{item.company}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Simple, transparent pricing</p>
            <h2>Start free. Scale as your team grows.</h2>
          </div>
        </div>

        <div className="landing-pricing-grid">
          {rolloutPlans.map((plan) => (
            <article
              key={plan.title}
              className={`landing-plan-card ${plan.featured ? 'featured' : ''}`}
            >
              <div className="landing-plan-head">
                <div>
                  <h3>{plan.title}</h3>
                  <p>{plan.subtitle}</p>
                </div>
                {plan.featured && <span className="landing-plan-badge">Most popular</span>}
              </div>

              <div className="landing-plan-price">
                {plan.price}
                <span className="landing-plan-period">{plan.period}</span>
              </div>

              <div className="landing-plan-list">
                {plan.features.map((feature) => (
                  <div key={feature} className="landing-plan-item">
                    <MaterialIcon icon="check_circle" className="landing-plan-item-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a href="#signup" className={`landing-plan-cta ${plan.featured ? 'primary' : ''}`}>
                {plan.featured ? 'Start free trial' : 'Get started'}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="landing-section landing-section-plain">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Frequently asked questions</p>
            <h2>Everything you need to know before getting started.</h2>
          </div>
        </div>

        <div className="landing-faq-list">
          {faqItems.map((item, index) => (
            <article key={item.question} className={`landing-faq-item ${openFaq === index ? 'open' : ''}`}>
              <button
                className="landing-faq-toggle"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                type="button"
              >
                <h3>{item.question}</h3>
                <MaterialIcon
                  icon="expand_more"
                  className={`landing-faq-chevron ${openFaq === index ? 'open' : ''}`}
                />
              </button>
              <div className="landing-faq-answer">
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="signup" className="landing-signup">
        <div className="landing-signup-copy">
          <p className="section-kicker">Get started</p>
          <h2>Start capturing your team&apos;s knowledge today.</h2>
          <p>
            Connect your Slack workspace and Converge will begin structuring decisions,
            context, and knowledge from your team conversations automatically.
          </p>

          <div className="landing-signup-meta">
            <div className="landing-signup-meta-card">
              <MaterialIcon icon="schedule" className="landing-signup-meta-icon" />
              <div>
                <strong>Setup in 15 minutes</strong>
                <span>Connect Slack, select channels, and start capturing immediately.</span>
              </div>
            </div>
            <div className="landing-signup-meta-card">
              <MaterialIcon icon="groups" className="landing-signup-meta-icon" />
              <div>
                <strong>Free for small teams</strong>
                <span>Up to 5 users can use Converge at no cost.</span>
              </div>
            </div>
            <div className="landing-signup-meta-card">
              <MaterialIcon icon="verified_user" className="landing-signup-meta-icon" />
              <div>
                <strong>No credit card required</strong>
                <span>Start your free trial with just a work email.</span>
              </div>
            </div>
          </div>
        </div>

        <form className="landing-signup-card" onSubmit={handleSignup}>
          {signupState === 'success' ? (
            <div className="landing-signup-success">
              <MaterialIcon icon="check_circle" className="landing-signup-success-icon" />
              <p>{signupMessage}</p>
            </div>
          ) : (
            <>
              <div className="landing-form-grid">
                <label className="landing-field">
                  <span>Full name</span>
                  <input
                    type="text"
                    value={signupForm.name}
                    onChange={(event) =>
                      setSignupForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your full name"
                    required
                  />
                </label>

                <label className="landing-field">
                  <span>Work email</span>
                  <input
                    type="email"
                    value={signupForm.email}
                    onChange={(event) =>
                      setSignupForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="name@company.com"
                    required
                  />
                </label>

                <label className="landing-field">
                  <span>Company</span>
                  <input
                    type="text"
                    value={signupForm.company}
                    onChange={(event) =>
                      setSignupForm((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                    placeholder="Company or team name"
                    required
                  />
                </label>

                <label className="landing-field">
                  <span>Your role</span>
                  <select
                    value={signupForm.role}
                    onChange={(event) =>
                      setSignupForm((current) => ({
                        ...current,
                        role: event.target.value,
                      }))
                    }
                  >
                    {roleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="landing-button landing-full-width"
                disabled={signupState === 'submitting'}
              >
                <span>
                  {signupState === 'submitting' ? 'Creating account...' : 'Start free trial'}
                </span>
                <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
              </button>
            </>
          )}
        </form>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <BrandMark className="brand-mark-image" size={36} />
            <div>
              <strong>CONVERGE</strong>
              <span>Knowledge capture platform</span>
            </div>
          </div>
          <p className="landing-footer-copy">
            &copy; {new Date().getFullYear()} Converge. Built to help teams capture what matters.
          </p>
        </div>
      </footer>
    </div>
  );
}
