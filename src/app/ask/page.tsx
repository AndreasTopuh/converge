'use client';

import { FormEvent, Suspense, useState } from 'react';
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

const loadingSteps = [
  'Retrieving captured decision records',
  'Checking channel, owner, and date metadata',
  'Preparing sourced intelligence report',
];

const judgeSignals = [
  {
    icon: 'verified_user',
    title: 'No answer without evidence',
    detail:
      'Every response is paired with a visible source block before it is shown.',
  },
  {
    icon: 'rule',
    title: 'Decision and reasoning are separated',
    detail:
      'Judges can see what Northstar decided and why it happened without reading the raw thread first.',
  },
  {
    icon: 'fact_check',
    title: 'Metadata stays reviewable',
    detail:
      'Channel, date, owners, and reference ID remain attached to the answer for quick validation.',
  },
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

  return {
    headline: 'No high-confidence decision record was found for that question.',
    answer:
      `Converge found related discussion inside ${demoCompany.name}'s workspace, but the captured record does not yet show a final high-confidence decision for this topic. In a real workspace, this is the signal that the team needs to formalize the outcome instead of leaving it implicit inside chat.`,
    decision: 'No definitive decision captured',
    reasoning: [
      'Related discussion exists, but it does not resolve to one explicit operating decision.',
      'The evidence trail is not strong enough to present a sourced answer with high confidence.',
      'The next step is to formalize the decision in-channel so Converge can preserve it as a reviewable record.',
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
  };
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

  const handleAsk = async (question: string) => {
    setQuery(question);
    setAskedQuestion(question);
    setResult(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setResult(resolveAskResult(question));
    setIsLoading(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    void handleAsk(query.trim());
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="page-header-copy">
          <div className="eyebrow">
            <MaterialIcon icon="search" className="eyebrow-icon" />
            {demoCompany.name} sourced query
          </div>
          <h1>Ask {demoCompany.shortName}</h1>
          <p>
            Query captured workspace knowledge and return a decision record that
            keeps the reasoning, source channel, owners, date, and reference ID
            visible on one screen. This is the highest-priority flow in the
            live demo.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="verified_user" className="header-note-icon" />
          <div>
            <strong>No answer ships without evidence</strong>
            <span>Each report keeps the decision, reasoning, and source thread in view</span>
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
                placeholder={`Ask why ${demoCompany.shortName} switched payment provider, chose Qdrant, or changed sprint retros`}
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
                <span>Run query</span>
                <MaterialIcon icon="arrow_forward" className="ask-submit-icon" />
              </button>
            </div>
          </form>

          {!result && !isLoading && !askedQuestion && (
            <div className="suggested-section">
              <div className="suggested-label">Run one of the seeded demo questions</div>
              <div className="suggested-grid">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="suggested-btn"
                    onClick={() => void handleAsk(question)}
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
            <div className="ask-loading">
              <div className="ask-loading-head">
                <strong>Preparing sourced intelligence report</strong>
                <span>
                  Converge is retrieving the decision record, validating the
                  metadata, and assembling the evidence block.
                </span>
              </div>

              <div className="ask-loading-steps">
                {loadingSteps.map((step) => (
                  <div key={step} className="ask-loading-step">
                    <MaterialIcon
                      icon="check_circle"
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
          )}

          {result && !isLoading && (
            <div className="ask-answer">
              <div className="answer-header">
                <div className="answer-header-left">
                  <MaterialIcon icon="verified" className="answer-header-icon" />
                  <span>Sourced intelligence report</span>
                </div>

                <div className="answer-header-right">
                  <span className="topic-tag">{result.topic}</span>
                  <span className={`confidence-badge ${result.confidence}`}>
                    {result.confidence} confidence
                  </span>
                </div>
              </div>

              <div className="answer-question">
                <span className="source-label">Question asked</span>
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
                    <span className="answer-section-kicker">Direct answer</span>
                    <h2>{result.headline}</h2>
                  </div>
                  <p className="answer-text">{result.answer}</p>
                </section>

                <section className="answer-section">
                  <div className="answer-section-header">
                    <span className="answer-section-kicker">Why this happened</span>
                    <h2>Reasoning preserved from the source conversation</h2>
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
                          <h3>Captured Slack thread linked to this answer</h3>
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
              </div>
            </div>
          )}
        </section>

        <aside className="surface-panel ask-secondary">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Judge view</p>
              <h2>What this screen proves in under a minute</h2>
            </div>
            <MaterialIcon icon="tune" className="panel-heading-icon" />
          </div>

          <div className="status-list">
            {judgeSignals.map((item) => (
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

          <div className="ask-sidebar-block">
            <div className="ask-sidebar-head">
              <p className="panel-kicker">Seeded demo prompts</p>
              <h3>Use these during the presentation</h3>
            </div>

            <div className="ask-sidebar-questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="ask-sidebar-question"
                  onClick={() => void handleAsk(question)}
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
