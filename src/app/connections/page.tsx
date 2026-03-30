'use client';

import { useState } from 'react';
import MaterialIcon from '@/components/MaterialIcon';
import {
  channelNames,
  connections,
  connectionStats,
  demoCompany,
  mvpStack,
} from '@/data/mockData';

const statCards = [
  {
    label: 'Messages ingested',
    value: connectionStats.totalMessages.toLocaleString(),
    note: `From ${demoCompany.shortName}'s connected Slack channels`,
    icon: 'mail',
    tone: 'accent',
  },
  {
    label: 'Decisions captured',
    value: connectionStats.decisionsCapture.toString(),
    note: 'Structured and ready for search and documentation',
    icon: 'checklist',
    tone: 'success',
  },
  {
    label: 'Active channels',
    value: connectionStats.activeChannels.toString(),
    note: 'Connected and syncing in real time',
    icon: 'forum',
    tone: 'neutral',
  },
  {
    label: 'Roadmap connectors',
    value: connectionStats.roadmapConnectors.toString(),
    note: 'Gmail, Notion, Drive, Jira, and Teams',
    icon: 'database',
    tone: 'warning',
  },
];

export default function ConnectionsPage() {
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectSuccess, setConnectSuccess] = useState<string | null>(null);

  const latestSync = connections.find((connection) => connection.status === 'connected')
    ?.lastSync;

  const handleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
      setConnectSuccess(id);
      setTimeout(() => setConnectSuccess(null), 3000);
    }, 2000);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="page-header-copy">
          <div className="eyebrow">
            <MaterialIcon icon="lan" className="eyebrow-icon" />
            {demoCompany.shortName} integrations
          </div>
          <h1>Connections</h1>
          <p>
            Manage the data sources that feed your workspace with searchable
            conversations, decisions, and reference material. Start with Slack
            and expand as your team grows.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="sync" className="header-note-icon" />
          <div>
            <strong>Slack sync is active</strong>
            <span>Last synced: {latestSync ?? 'Unavailable'}</span>
          </div>
        </div>
      </div>

      <div className="stats-row">
        {statCards.map((card) => (
          <div key={card.label} className={`stat-card ${card.tone}`}>
            <div className="stat-card-top">
              <div className="stat-icon-wrap">
                <MaterialIcon icon={card.icon} className="stat-icon" />
              </div>
              <div className="stat-label">{card.label}</div>
            </div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-note">{card.note}</div>
          </div>
        ))}
      </div>

      <section className="surface-panel integration-note">
        <div className="panel-heading">
          <div>
            <p className="panel-kicker">Architecture stack</p>
            <h2>What powers the ingestion pipeline</h2>
          </div>
          <MaterialIcon icon="database" className="panel-heading-icon" />
        </div>

        <p className="integration-note-copy">
          Slack is the primary source feeding real-time conversations into the
          knowledge pipeline. Messages flow through AI classification, reasoning
          extraction, and semantic indexing before becoming searchable.
        </p>

        <div className="stack-chip-row">
          {mvpStack.slice(0, 7).map((item) => (
            <span key={item} className="stack-chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <div className="card-grid">
        {connections.map((connection) => {
          const isConnected = connection.status === 'connected';
          const isConnecting = connectingId === connection.id;
          const justConnected = connectSuccess === connection.id;

          return (
            <article
              key={connection.id}
              className={`connection-card ${isConnected ? 'connected' : ''} ${justConnected ? 'just-connected' : ''}`}
            >
              <div className="connection-header">
                <div className="connection-platform">
                  <div className="connection-icon-wrap">
                    <MaterialIcon
                      icon={connection.icon}
                      className="connection-icon"
                    />
                  </div>
                  <div>
                    <span className="name">{connection.platform}</span>
                    <p className="connection-summary">
                      {isConnected
                        ? `Active source feeding team context into your workspace.`
                        : justConnected
                        ? 'Connection request submitted!'
                        : 'Available integration for enterprise knowledge capture.'}
                    </p>
                  </div>
                </div>

                {isConnected ? (
                  <span className="status-badge connected">
                    <MaterialIcon icon="check_circle" className="status-badge-icon" />
                    Connected
                  </span>
                ) : justConnected ? (
                  <span className="status-badge connected">
                    <MaterialIcon icon="check_circle" className="status-badge-icon" />
                    Requested
                  </span>
                ) : (
                  <button
                    type="button"
                    className="connect-btn"
                    onClick={() => handleConnect(connection.id)}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <MaterialIcon icon="sync" className="connect-btn-spinner" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <MaterialIcon icon="arrow_outward" className="connect-btn-icon" />
                        Connect
                      </>
                    )}
                  </button>
                )}
              </div>

              {isConnected ? (
                <>
                  <div className="connection-details">
                    <div className="connection-detail">
                      <div className="label">Workspace</div>
                      <div className="value">{connection.workspace}</div>
                    </div>
                    <div className="connection-detail">
                      <div className="label">Channels</div>
                      <div className="value">{connection.channels} synced</div>
                    </div>
                    <div className="connection-detail">
                      <div className="label">Messages</div>
                      <div className="value">
                        {connection.messagesIngested.toLocaleString()}
                      </div>
                    </div>
                    <div className="connection-detail">
                      <div className="label">Last sync</div>
                      <div className="value">{connection.lastSync}</div>
                    </div>
                  </div>

                  <div className="connection-channels">
                    <span className="connection-channels-label">Active channels</span>
                    <div className="connection-channel-list">
                      {channelNames.map((channel) => (
                        <span key={channel} className="connection-channel-chip">
                          <MaterialIcon icon="forum" className="channel-chip-icon" />
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="connection-sync-bar">
                    <div className="connection-sync-info">
                      <MaterialIcon icon="sync" className="connection-sync-icon" />
                      <span>Sync active — next refresh in 5 minutes</span>
                    </div>
                    <div className="connection-sync-progress">
                      <span className="connection-sync-fill" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="connection-empty">
                  {justConnected
                    ? 'Your connection request has been submitted. We\'ll notify you once setup is complete.'
                    : 'Click Connect to start ingesting data from this source into your knowledge workspace.'}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
