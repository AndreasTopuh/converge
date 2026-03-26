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

function resolveAskResult(question: string): AskResult {
  const matchKey = Object.keys(askResponses).find(
    (key) =>
      key.toLowerCase().includes(question.toLowerCase().slice(0, 20)) ||
      question.toLowerCase().includes(key.toLowerCase().slice(0, 20))
  );

  if (matchKey) {
    return askResponses[matchKey];
  }

  return {
    answer: `Based on the captured knowledge in ${demoCompany.name}'s workspace, I found related discussions about "${question}". The topic appeared across multiple channels, but no definitive decision was recorded with high confidence. Consider opening a dedicated thread so the team can document a final outcome.`,
    sources: [
      {
        channel: '#general',
        date: 'March 2026',
        people: ['Northstar team'],
        messagePreview:
          '"Related discussions were found across multiple channels, but the conclusion was not formalized..."',
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

    await new Promise((resolve) => setTimeout(resolve, 1800));

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
            {demoCompany.name} search
          </div>
          <h1>Ask {demoCompany.shortName}</h1>
          <p>
            Search {demoCompany.name}&apos;s captured knowledge and retrieve
            answers linked back to the conversations that support them. This is
            the primary Q&A flow used in the live demo.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="travel_explore" className="header-note-icon" />
          <div>
            <strong>Grounded retrieval</strong>
            <span>Each answer keeps the channel, date, and people visible for review</span>
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
                placeholder={`Ask why ${demoCompany.shortName} changed payment provider, chose Qdrant, or extended onboarding`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="ask-submit"
                disabled={!query.trim() || isLoading}
                aria-label="Submit question"
              >
                <MaterialIcon icon="arrow_forward" className="ask-submit-icon" />
              </button>
            </div>
          </form>

          {!result && !isLoading && !askedQuestion && (
            <div className="suggested-section">
              <div className="suggested-label">Try one of the demo questions</div>
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
              <div className="loading-dots" aria-hidden="true">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
              </div>
              <span className="loading-text">Searching the knowledge base</span>
            </div>
          )}

          {result && !isLoading && (
            <div className="ask-answer">
              <div className="answer-header">
                <div className="answer-header-left">
                  <MaterialIcon icon="lightbulb" className="answer-header-icon" />
                  <span>Sourced answer</span>
                </div>
                <span className={`confidence-badge ${result.confidence}`}>
                  {result.confidence} confidence
                </span>
              </div>

              <div className="answer-body">
                <p className="answer-text">{result.answer}</p>

                {result.sources.map((source, index) => (
                  <div key={index} className="answer-source">
                    <div className="source-label">Source conversation</div>
                    <div className="source-meta">
                      <span className="source-meta-item">
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
              </div>
            </div>
          )}
        </section>

        <aside className="surface-panel ask-secondary">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Prompt guidance</p>
              <h2>Improve answer quality</h2>
            </div>
            <MaterialIcon icon="tune" className="panel-heading-icon" />
          </div>

          <div className="status-list">
            <div className="status-item">
              <div className="status-item-icon">
                <MaterialIcon icon="rule" className="status-icon" />
              </div>
              <div className="status-item-copy">
                <h3>Be specific</h3>
                <p>
                  Reference a team, project, or decision area inside the {demoCompany.shortName} workspace.
                </p>
              </div>
            </div>

            <div className="status-item">
              <div className="status-item-icon">
                <MaterialIcon icon="history" className="status-icon" />
              </div>
              <div className="status-item-copy">
                <h3>Use timeframe hints</h3>
                <p>
                  Mention a month, quarter, or milestone if you need a narrower answer.
                </p>
              </div>
            </div>

            <div className="status-item">
              <div className="status-item-icon">
                <MaterialIcon icon="fact_check" className="status-icon" />
              </div>
              <div className="status-item-copy">
                <h3>Review the sources</h3>
                <p>
                  Converge surfaces source conversations so business decisions
                  can be verified quickly.
                </p>
              </div>
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
