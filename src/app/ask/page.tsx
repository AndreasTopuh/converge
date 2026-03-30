'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MaterialIcon from '@/components/MaterialIcon';
import {
  askResponses,
  demoCompany,
  suggestedQuestions,
  type AskResult,
} from '@/data/mockData';

const paymentQuestion = 'Why did Northstar switch payment provider?';
const qdrantQuestion = 'Why did Northstar choose Qdrant?';
const sprintQuestion = "Who changed Northstar's sprint retrospective cadence?";
const onboardingQuestion = "What is Northstar's onboarding playbook?";
const aiQuestion = 'Why is Northstar using Claude Sonnet 4.6?';
const securityQuestion = "What is Northstar's security policy for customer data?";
const monorepoQuestion = 'Why did Northstar adopt a monorepo structure?';

const loadingSteps = [
  'Searching captured decision records...',
  'Validating source evidence...',
  'Preparing intelligence report...',
];

const normalizeQuestion = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function resolveAskResult(question: string): AskResult {
  const normalized = normalizeQuestion(question);
  const exactMatch = Object.keys(askResponses).find(
    (key) => normalizeQuestion(key) === normalized
  );

  if (exactMatch) {
    return askResponses[exactMatch];
  }

  if (
    normalized.includes('payment') &&
    (normalized.includes('provider') ||
      normalized.includes('billplz') ||
      normalized.includes('stripe'))
  ) {
    return askResponses[paymentQuestion];
  }

  if (normalized.includes('qdrant') || normalized.includes('pgvector')) {
    return askResponses[qdrantQuestion];
  }

  if (
    normalized.includes('retro') ||
    normalized.includes('cadence') ||
    normalized.includes('weekly')
  ) {
    return askResponses[sprintQuestion];
  }

  if (
    normalized.includes('onboarding') ||
    normalized.includes('playbook') ||
    normalized.includes('sla')
  ) {
    return askResponses[onboardingQuestion];
  }

  if (
    normalized.includes('claude') ||
    normalized.includes('gemini') ||
    normalized.includes('llm') ||
    normalized.includes('reasoning')
  ) {
    return askResponses[aiQuestion];
  }

  if (
    normalized.includes('security') ||
    normalized.includes('encryption') ||
    normalized.includes('pdpa') ||
    normalized.includes('pii')
  ) {
    return askResponses[securityQuestion];
  }

  if (
    normalized.includes('monorepo') ||
    normalized.includes('turborepo')
  ) {
    return askResponses[monorepoQuestion];
  }

  return {
    headline: 'No high-confidence decision record was found for that question.',
    answer:
      `Converge found related discussion inside ${demoCompany.name}'s workspace, but the captured record does not yet show a final high-confidence decision for this topic. This is a signal that the team needs to formalize the outcome so it becomes part of the knowledge base.`,
    decision: 'No definitive decision captured',
    reasoning: [
      'Related discussion exists, but it does not resolve to one explicit operating decision.',
      'The evidence trail is not strong enough to present a sourced answer with high confidence.',
      'The next step is to formalize the decision in-channel so Converge can capture it.',
    ],
    topic: 'Needs follow-up',
    sources: [
      {
        channel: '#general',
        date: 'March 2026',
        people: ['Northstar team'],
        reference: 'UNRESOLVED-SEARCH-01',
        messagePreview:
          '"Related discussion exists, but the final owner and approved outcome were never made explicit in the thread."',
      },
    ],
    confidence: 'medium',
    followUp: [
      'Try asking about a specific topic like payments or onboarding',
      'Browse the Brain Feed to explore captured decisions',
    ],
  };
}

function TypewriterText({ text, speed = 12 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      {!isDone && <span className="typing-cursor" />}
    </span>
  );
}

function StepLoader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = loadingSteps.map((_, index) =>
      setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === loadingSteps.length - 1) {
          setTimeout(onComplete, 400);
        }
      }, (index + 1) * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="ask-loading">
      <div className="ask-loading-head">
        <strong>Searching your knowledge base</strong>
        <span>
          Converge is retrieving relevant decisions and assembling a sourced report.
        </span>
      </div>

      <div className="ask-loading-steps">
        {loadingSteps.map((step, index) => (
          <div
            key={step}
            className={`ask-loading-step ${index < currentStep ? 'done' : ''} ${index === currentStep ? 'active' : ''}`}
          >
            <MaterialIcon
              icon={index < currentStep ? 'check_circle' : 'search'}
              className="ask-loading-step-icon"
            />
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="ask-loading-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}

function AskContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AskResult | null>(() =>
    initialQuery ? resolveAskResult(initialQuery) : null
  );
  const [askedQuestion, setAskedQuestion] = useState(initialQuery);

  const handleAsk = (question: string) => {
    setQuery(question);
    setAskedQuestion(question);
    setResult(null);
    setIsLoading(true);
  };

  const handleLoadComplete = () => {
    setResult(resolveAskResult(askedQuestion));
    setIsLoading(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    handleAsk(query.trim());
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="page-header-copy">
          <div className="eyebrow">
            <MaterialIcon icon="search" className="eyebrow-icon" />
            {demoCompany.name} knowledge search
          </div>
          <h1>Ask your workspace</h1>
          <p>
            Search your captured workspace knowledge and get answers with full
            source tracing — including the reasoning, people, channel, and date
            behind every decision.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="verified_user" className="header-note-icon" />
          <div>
            <strong>Every answer includes source evidence</strong>
            <span>Decisions, reasoning, and source threads are always visible</span>
          </div>
        </div>
      </div>

      <div className="ask-layout">
        <section className="surface-panel ask-primary">
          <form onSubmit={handleSubmit}>
            <div className="ask-input-shell">
              <MaterialIcon icon="search" className="ask-field-icon" />
              <input
                id="ask-input"
                type="text"
                className="ask-input"
                placeholder="Ask about any decision, person, or topic in the workspace..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="ask-submit"
                disabled={!query.trim() || isLoading}
                aria-label="Run sourced query"
              >
                <span>Search</span>
                <MaterialIcon icon="arrow_forward" className="ask-submit-icon" />
              </button>
            </div>
          </form>

          {!result && !isLoading && !askedQuestion && (
            <div className="suggested-section">
              <div className="suggested-label">Try one of these questions to get started</div>
              <div className="suggested-grid">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="suggested-btn"
                    onClick={() => handleAsk(question)}
                  >
                    <MaterialIcon
                      icon="subdirectory_arrow_right"
                      className="suggested-btn-icon"
                    />
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <StepLoader onComplete={handleLoadComplete} />
          )}

          {result && !isLoading && (
            <div className="ask-answer">
              <div className="answer-header">
                <div className="answer-header-left">
                  <MaterialIcon icon="verified" className="answer-header-icon" />
                  <span>Intelligence report</span>
                </div>

                <div className="answer-header-right">
                  <span className="topic-tag">{result.topic}</span>
                  <span className={`confidence-badge ${result.confidence}`}>
                    {result.confidence} confidence
                  </span>
                </div>
              </div>

              <div className="answer-question">
                <span className="source-label">Question</span>
                <p>{askedQuestion}</p>
              </div>

              <div className="answer-body">
                <div className="answer-summary-grid">
                  <article className="answer-summary-card">
                    <span className="answer-card-label">Decision captured</span>
                    <strong>{result.decision}</strong>
                  </article>

                  <article className="answer-summary-card">
                    <span className="answer-card-label">Primary owners</span>
                    <strong>{result.sources[0]?.people.join(', ')}</strong>
                    <p>{result.sources[0]?.date}</p>
                  </article>

                  <article className="answer-summary-card">
                    <span className="answer-card-label">Reference ID</span>
                    <strong className="reference-code">
                      {result.sources[0]?.reference}
                    </strong>
                    <p>{result.sources[0]?.channel}</p>
                  </article>
                </div>

                <section className="answer-section">
                  <div className="answer-section-header">
                    <span className="answer-section-kicker">Answer</span>
                    <h2><TypewriterText text={result.headline} speed={15} /></h2>
                  </div>
                  <p className="answer-text">{result.answer}</p>
                </section>

                <section className="answer-section">
                  <div className="answer-section-header">
                    <span className="answer-section-kicker">Reasoning</span>
                    <h2>Why this decision was made</h2>
                  </div>

                  <ul className="answer-reasoning-list">
                    {result.reasoning.map((item) => (
                      <li key={item} className="answer-reasoning-item">
                        <MaterialIcon
                          icon="check_circle"
                          className="answer-reasoning-icon"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="answer-evidence-stack">
                  {result.sources.map((source) => (
                    <div key={source.reference} className="answer-source">
                      <div className="source-top">
                        <div>
                          <div className="source-label">Source evidence</div>
                          <h3>Linked conversation thread</h3>
                        </div>
                        <span className="source-reference">{source.reference}</span>
                      </div>

                      <div className="source-meta">
                        <span className="source-meta-item channel-pill">
                          <MaterialIcon
                            icon="forum"
                            className="source-meta-item-icon"
                          />
                          {source.channel}
                        </span>
                        <span className="source-meta-item">
                          <MaterialIcon
                            icon="calendar_month"
                            className="source-meta-item-icon"
                          />
                          {source.date}
                        </span>
                        <span className="source-meta-item">
                          <MaterialIcon
                            icon="group"
                            className="source-meta-item-icon"
                          />
                          {source.people.join(', ')}
                        </span>
                      </div>

                      <p className="source-preview">{source.messagePreview}</p>
                    </div>
                  ))}
                </section>

                {result.followUp && result.followUp.length > 0 && (
                  <section className="answer-followup">
                    <div className="answer-section-header">
                      <span className="answer-section-kicker">Related questions</span>
                      <h2>Continue exploring</h2>
                    </div>
                    <div className="followup-grid">
                      {result.followUp.map((q) => (
                        <button
                          key={q}
                          type="button"
                          className="followup-btn"
                          onClick={() => handleAsk(q)}
                        >
                          <MaterialIcon icon="subdirectory_arrow_right" className="followup-btn-icon" />
                          <span>{q}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </section>

        <aside className="surface-panel ask-secondary">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">How it works</p>
              <h2>Understanding sourced answers</h2>
            </div>
            <MaterialIcon icon="lightbulb" className="panel-heading-icon" />
          </div>

          <div className="status-list">
            <div className="status-item">
              <div className="status-item-icon">
                <MaterialIcon icon="verified_user" className="status-icon" />
              </div>
              <div className="status-item-copy">
                <h3>Evidence-backed answers</h3>
                <p>Every response includes the source conversation, people involved, and timestamp.</p>
              </div>
            </div>
            <div className="status-item">
              <div className="status-item-icon">
                <MaterialIcon icon="rule" className="status-icon" />
              </div>
              <div className="status-item-copy">
                <h3>Decision and reasoning separated</h3>
                <p>See what was decided and why it happened without reading raw chat threads.</p>
              </div>
            </div>
            <div className="status-item">
              <div className="status-item-icon">
                <MaterialIcon icon="fact_check" className="status-icon" />
              </div>
              <div className="status-item-copy">
                <h3>Full traceability</h3>
                <p>Channel, date, owners, and reference ID remain attached for quick verification.</p>
              </div>
            </div>
          </div>

          <div className="ask-sidebar-block">
            <div className="ask-sidebar-head">
              <p className="panel-kicker">Suggested questions</p>
              <h3>Explore the workspace</h3>
            </div>

            <div className="ask-sidebar-questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="ask-sidebar-question"
                  onClick={() => handleAsk(question)}
                >
                  <MaterialIcon
                    icon="subdirectory_arrow_right"
                    className="ask-sidebar-question-icon"
                  />
                  <span>{question}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense fallback={<div className="empty-state">Loading...</div>}>
      <AskContent />
    </Suspense>
  );
}
