import MaterialIcon from '@/components/MaterialIcon';
import {
  connections,
  connectionStats,
  demoCompany,
  mvpStack,
} from '@/data/mockData';

const statCards = [
  {
    label: 'Messages ingested',
    value: connectionStats.totalMessages.toLocaleString(),
    note: `Captured from ${demoCompany.shortName}'s connected Slack channels`,
    icon: 'mail',
    tone: 'accent',
  },
  {
    label: 'Decisions captured',
    value: connectionStats.decisionsCapture.toString(),
    note: 'Structured and ready for search, feed review, and documentation',
    icon: 'checklist',
    tone: 'success',
  },
  {
    label: 'Active channels',
    value: connectionStats.activeChannels.toString(),
    note: 'Currently synchronized with Converge',
    icon: 'forum',
    tone: 'neutral',
  },
  {
    label: 'Knowledge items',
    value: connectionStats.knowledgeItems.toString(),
    note: 'Indexed demo assets available across the workspace',
    icon: 'database',
    tone: 'warning',
  },
];

export default function ConnectionsPage() {
  const latestSync = connections.find((connection) => connection.status === 'connected')
    ?.lastSync;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="page-header-copy">
          <div className="eyebrow">
            <MaterialIcon icon="lan" className="eyebrow-icon" />
            {demoCompany.shortName} data sources
          </div>
          <h1>Connections</h1>
          <p>
            Manage the systems that feed the {demoCompany.name} demo workspace
            with searchable conversations, decisions, and reference material.
          </p>
        </div>

        <div className="header-note">
          <MaterialIcon icon="sync" className="header-note-icon" />
          <div>
            <strong>Slack ingest is live</strong>
            <span>Latest workspace refresh: {latestSync ?? 'Unavailable'}</span>
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
            <p className="panel-kicker">Demo ingest path</p>
            <h2>What is actually powering the sample workspace</h2>
          </div>
          <MaterialIcon icon="database" className="panel-heading-icon" />
        </div>

        <p className="integration-note-copy">
          For the live demo, Slack is the active source feeding the sample
          workspace. The rest of the page shows the production-minded connector
          roadmap that expands the same knowledge model into email, documents,
          and other enterprise systems.
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

          return (
            <article
              key={connection.id}
              className={`connection-card ${isConnected ? 'connected' : ''}`}
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
                        ? `Active source feeding fresh ${demoCompany.shortName} team context into Converge.`
                        : 'Planned connector for broader enterprise knowledge coverage.'}
                    </p>
                  </div>
                </div>

                <span
                  className={`status-badge ${
                    isConnected ? 'connected' : 'coming-soon'
                  }`}
                >
                  <MaterialIcon
                    icon={isConnected ? 'check_circle' : 'schedule'}
                    className="status-badge-icon"
                  />
                  {isConnected ? 'Connected' : 'Coming soon'}
                </span>
              </div>

              {isConnected ? (
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
              ) : (
                <div className="connection-empty">
                  Connector setup is not enabled yet. This integration is part
                  of the production roadmap shown in the architecture deck.
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
