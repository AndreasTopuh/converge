'use client';

import { FormEvent, startTransition, useState } from 'react';
import Link from 'next/link';
import MaterialIcon from '@/components/MaterialIcon';
import BrandMark from '@/components/BrandMark';
import { autoDocs, brainFeedItems, connectionStats } from '@/data/mockData';

const trustGroups = [
  'Operations teams',
  'Founders',
  'Product leads',
  'Customer success',
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
      'Turn institutional knowledge into instant answers for product, operations, and leadership teams.',
    meta: 'Grounded search across decisions and people',
  },
  {
    href: '/brain-feed',
    icon: 'timeline',
    title: 'Brain Feed',
    description:
      'Review extracted decisions, reasoning, and confidence in a stream built for fast executive readouts.',
    meta: 'Decision feed with reasoning and ownership',
  },
  {
    href: '/auto-docs',
    icon: 'description',
    title: 'Auto Docs',
    description:
      'Create SOPs and operational documents from the conversations that shaped the policy or process.',
    meta: 'Structured docs from captured context',
  },
  {
    href: '/connections',
    icon: 'lan',
    title: 'Connections',
    description:
      'Link Converge with Slack and future systems so knowledge capture happens where work already happens.',
    meta: 'Live sync for chat-native teams',
  },
];

const pilotFeedback = [
  {
    quote:
      'We stopped losing key operating decisions in Slack threads. Converge turned our internal context into something leadership could actually review.',
    name: 'Operations lead',
    company: 'B2B SaaS pilot team',
  },
  {
    quote:
      'The value was immediate for onboarding. New team members could search why decisions were made instead of asking around for context.',
    name: 'Chief of staff',
    company: 'Distributed services company',
  },
  {
    quote:
      'Auto Docs made the product feel real for our stakeholders because it translated chat history into something formal and presentation-ready.',
    name: 'Product manager',
    company: 'Early-stage platform team',
  },
];

const rolloutPlans = [
  {
    title: 'Pilot',
    subtitle: 'For a single team validating internal fit',
    price: 'Custom',
    features: [
      'Slack workspace integration',
      'Decision feed and source linking',
      'Ask and Auto Docs workspace access',
    ],
  },
  {
    title: 'Growth',
    subtitle: 'For cross-functional teams scaling shared context',
    price: 'Custom',
    features: [
      'Multiple teams and channels',
      'Operational playbooks and governance views',
      'Priority onboarding and workflow setup',
    ],
    featured: true,
  },
  {
    title: 'Enterprise',
    subtitle: 'For regulated or high-context organizations',
    price: 'Contact',
    features: [
      'Advanced rollout planning',
      'Security and compliance review support',
      'Custom workflows and integration roadmap',
    ],
  },
];

const teamSizeOptions = ['1-10', '11-50', '51-200', '200+'];
const roleOptions = [
  'Founder or leadership',
  'Operations',
  'Product or engineering',
  'Customer success',
  'Knowledge or AI team',
];
const focusAreaOptions = [
  'Decision capture',
  'Searchable company knowledge',
  'Automated documentation',
  'Onboarding and enablement',
  'Compliance or governance',
];
const faqItems = [
  {
    question: 'Who is Converge for?',
    answer:
      'Converge is best for teams that already coordinate in chat and need a cleaner operating memory for decisions, handoffs, and documentation.',
  },
  {
    question: 'Is this replacing our existing tools?',
    answer:
      'No. The product is positioned as a layer on top of systems like Slack so teams can keep working in familiar channels while Converge structures what matters.',
  },
  {
    question: 'What happens after signup?',
    answer:
      'Qualified teams get a short product walkthrough, pilot scoping, and onboarding guidance based on team size, decision volume, and evaluation goals.',
  },
];

export default function PublicHome() {
  const featuredDoc = autoDocs[0];
  const featuredDecision = brainFeedItems[0];
  const publishedDocs = autoDocs.filter((doc) => doc.status === 'published').length;

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    company: '',
    role: roleOptions[0],
    teamSize: teamSizeOptions[1],
    focusArea: focusAreaOptions[0],
    notes: '',
    consent: false,
  });
  const [signupState, setSignupState] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.company ||
      !signupForm.consent
    ) {
      return;
    }

    setSignupState('submitting');

    window.setTimeout(() => {
      startTransition(() => {
        const firstName = signupForm.name.trim().split(/\s+/)[0] || 'there';

        setSignupState('success');
        setSignupMessage(
          `Thanks, ${firstName}. Your pilot request has been recorded. We will review your team details and follow up at ${signupForm.email} within two business days.`
        );
        setSignupForm({
          name: '',
          email: '',
          company: '',
          role: roleOptions[0],
          teamSize: teamSizeOptions[1],
          focusArea: focusAreaOptions[0],
          notes: '',
          consent: false,
        });
      });
    }, 900);
  };

  return (
    <div className="landing-page">
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
          <a href="#signup">Signup</a>
        </nav>

        <div className="landing-actions">
          <Link href="/dashboard" className="landing-link">
            Open workspace
          </Link>
          <a href="#signup" className="landing-button">
            <span>Join early access</span>
            <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
          </a>
        </div>
      </header>

      <section className="landing-hero landing-hero-expanded">
        <div className="landing-hero-copy">
          <div className="eyebrow landing-eyebrow">
            <MaterialIcon icon="verified" className="eyebrow-icon" />
            Built for startup teams that move through chat
          </div>

          <h1>
            Converge turns everyday conversations into searchable company
            knowledge.
          </h1>

          <p>
            Capture decisions, preserve reasoning, and generate operational
            documentation from the tools your team already uses. Converge gives
            founders, operators, and product teams a clear memory of what was
            decided and why.
          </p>

          <div className="landing-hero-actions">
            <a href="#signup" className="landing-button">
              <span>Request early access</span>
              <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
            </a>
            <Link href="/dashboard" className="landing-secondary-button">
              <MaterialIcon icon="space_dashboard" className="landing-secondary-icon" />
              <span>Explore the workspace</span>
            </Link>
          </div>

          <div className="landing-trust-strip">
            <span className="landing-trust-label">Relevant for:</span>
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
              <p className="panel-kicker">Live workspace snapshot</p>
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

          <div className="landing-preview-grid">
            <article className="landing-preview-card">
              <div className="landing-preview-head">
                <span className="topic-tag">{featuredDecision.topic}</span>
                <span className={`confidence-badge ${featuredDecision.confidence}`}>
                  {featuredDecision.confidence}
                </span>
              </div>
              <h2>{featuredDecision.decision}</h2>
              <p>{featuredDecision.reasoning}</p>
            </article>

            <article className="landing-preview-card">
              <div className="landing-preview-head">
                <span className="landing-mini-label">Generated document</span>
                <MaterialIcon icon="description" className="landing-mini-icon" />
              </div>
              <h2>{featuredDoc.title}</h2>
              <p>{featuredDoc.description}</p>
              <div className="landing-mini-meta">
                <span className="meta-pill">
                  <MaterialIcon icon="calendar_month" className="meta-pill-icon" />
                  {featuredDoc.generatedDate}
                </span>
                <span className="meta-pill">
                  <MaterialIcon icon="attachment" className="meta-pill-icon" />
                  {featuredDoc.sourceCount} sources
                </span>
              </div>
            </article>
          </div>
        </aside>
      </section>

      <section className="landing-proof">
        <div className="landing-proof-copy">
          <p className="section-kicker">Why teams care</p>
          <h2>Important operational decisions should not vanish into chat history.</h2>
          <p>
            Converge is for teams that already run on chat but still need a
            system of record for decisions, rationale, and knowledge transfer.
          </p>
        </div>

        <div className="landing-proof-grid">
          <article className="landing-proof-card">
            <MaterialIcon icon="forum" className="landing-proof-icon" />
            <strong>Conversation-native</strong>
            <p>
              Works with the discussions teams already have, instead of forcing
              a separate tool for every decision.
            </p>
          </article>
          <article className="landing-proof-card">
            <MaterialIcon icon="verified_user" className="landing-proof-icon" />
            <strong>Grounded and reviewable</strong>
            <p>
              Every answer stays anchored to channel history, people, and
              timestamps for fast verification.
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

      <section id="features" className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Core capabilities</p>
            <h2>What Converge helps people do.</h2>
          </div>
        </div>

        <div className="landing-feature-grid">
          {useCases.map((item) => (
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

      <section id="surfaces" className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Product surfaces</p>
            <h2>A more realistic view of the product experience.</h2>
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
            <p className="section-kicker">Pilot feedback</p>
            <h2>How early teams describe the value.</h2>
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
            <p className="section-kicker">Rollout options</p>
            <h2>Position the product like a real startup offer.</h2>
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
                {plan.featured && <span className="landing-plan-badge">Recommended</span>}
              </div>

              <div className="landing-plan-price">{plan.price}</div>

              <div className="landing-plan-list">
                {plan.features.map((feature) => (
                  <div key={feature} className="landing-plan-item">
                    <MaterialIcon icon="check_circle" className="landing-plan-item-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="landing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Frequently asked questions</p>
            <h2>Answer the questions people usually ask before booking time.</h2>
          </div>
        </div>

        <div className="landing-faq-list">
          {faqItems.map((item) => (
            <article key={item.question} className="landing-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="signup" className="landing-signup">
        <div className="landing-signup-copy">
          <p className="section-kicker">Signup</p>
          <h2>Request pilot access or join the waitlist.</h2>
          <p>
            This positions the page like a real startup product: visitors can
            register interest, share evaluation context, and signal whether they
            are serious about a pilot rather than casually browsing.
          </p>

          <div className="landing-signup-meta">
            <div className="landing-signup-meta-card">
              <MaterialIcon icon="schedule" className="landing-signup-meta-icon" />
              <div>
                <strong>48-hour review</strong>
                <span>Qualified requests get a reply within two business days.</span>
              </div>
            </div>
            <div className="landing-signup-meta-card">
              <MaterialIcon icon="groups" className="landing-signup-meta-icon" />
              <div>
                <strong>Founder-led onboarding</strong>
                <span>Pilot teams get setup help for channel mapping and workflows.</span>
              </div>
            </div>
            <div className="landing-signup-meta-card">
              <MaterialIcon icon="verified_user" className="landing-signup-meta-icon" />
              <div>
                <strong>Private beta access</strong>
                <span>Designed for early teams that want guided rollout support.</span>
              </div>
            </div>
          </div>

          <div className="landing-signup-points">
            <div className="landing-signup-point">
              <MaterialIcon icon="check_circle" className="landing-signup-point-icon" />
              <span>Slack-first pilot onboarding</span>
            </div>
            <div className="landing-signup-point">
              <MaterialIcon icon="description" className="landing-signup-point-icon" />
              <span>Access to Ask, Brain Feed, and Auto Docs</span>
            </div>
            <div className="landing-signup-point">
              <MaterialIcon icon="verified_user" className="landing-signup-point-icon" />
              <span>Priority follow-up for serious evaluation teams</span>
            </div>
          </div>
        </div>

        <form className="landing-signup-card" onSubmit={handleSignup}>
          <div className="landing-form-grid">
            <label className="landing-field">
              <span>Name</span>
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
              <span>Role</span>
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

            <label className="landing-field">
              <span>Team size</span>
              <select
                value={signupForm.teamSize}
                onChange={(event) =>
                  setSignupForm((current) => ({
                    ...current,
                    teamSize: event.target.value,
                  }))
                }
              >
                {teamSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="landing-field">
              <span>Primary use case</span>
              <select
                value={signupForm.focusArea}
                onChange={(event) =>
                  setSignupForm((current) => ({
                    ...current,
                    focusArea: event.target.value,
                  }))
                }
              >
                {focusAreaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="landing-field full">
              <span>What are you trying to solve?</span>
              <textarea
                value={signupForm.notes}
                onChange={(event) =>
                  setSignupForm((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                placeholder="Example: We lose product and operations decisions in Slack, and onboarding takes too long because context is fragmented."
                rows={5}
              />
            </label>
          </div>

          <label className="landing-field checkbox">
            <input
              type="checkbox"
              checked={signupForm.consent}
              onChange={(event) =>
                setSignupForm((current) => ({
                  ...current,
                  consent: event.target.checked,
                }))
              }
              required
            />
            <span>I agree to be contacted about early access, demos, and pilot evaluation.</span>
          </label>

          <button
            type="submit"
            className="landing-button landing-submit"
            disabled={signupState === 'submitting'}
          >
            <span>
              {signupState === 'submitting' ? 'Submitting request...' : 'Join early access'}
            </span>
            <MaterialIcon icon="arrow_outward" className="landing-button-icon" />
          </button>

          <p className="landing-form-note">
            No credit card required. This form is framed as an early-access
            request for pilot teams, design partners, and serious evaluators.
          </p>

          {signupMessage ? (
            <div className="landing-success-banner">{signupMessage}</div>
          ) : null}
        </form>
      </section>
    </div>
  );
}
