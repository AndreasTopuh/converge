// ================================
// CONVERGE MVP - Demo Source of Truth
// ================================

export interface Connection {
  id: string;
  platform: string;
  icon: string;
  workspace: string;
  status: 'connected' | 'disconnected' | 'coming_soon';
  channels: number;
  lastSync: string;
  messagesIngested: number;
}

export interface BrainFeedItem {
  id: string;
  decision: string;
  reasoning: string;
  people: string[];
  channel: string;
  date: string;
  confidence: 'high' | 'medium';
  topic: string;
}

export interface AskSource {
  channel: string;
  date: string;
  people: string[];
  reference: string;
  messagePreview: string;
}

export interface AskResult {
  headline: string;
  answer: string;
  decision: string;
  reasoning: string[];
  topic: string;
  confidence: 'high' | 'medium';
  sources: AskSource[];
}

export interface AutoDoc {
  id: string;
  title: string;
  description: string;
  generatedDate: string;
  sourceCount: number;
  status: 'published' | 'draft';
  content: string;
}

export const demoCompany = {
  name: 'Northstar Commerce',
  shortName: 'Northstar',
  workspaceName: 'Northstar Commerce Workspace',
  workspaceSubtitle: 'Growth-stage Malaysian commerce workspace',
  description:
    'A fictional growth-stage Malaysian e-commerce startup used throughout the Converge demo. Its workspace combines payments, engineering, client operations, architecture, and AI research decisions in one searchable system of record.',
};

export const mvpStack = [
  'Slack Events API',
  'Socket Mode',
  'BullMQ',
  'Redis',
  'Gemini 2.0 Flash',
  'Claude Sonnet 4.6',
  'Gemini text-embedding-004',
  'Qdrant Cloud',
  'Supabase',
  'LlamaIndex',
  'Next.js',
  'Vercel',
];

export const productionDirection = [
  'GraphRAG',
  'Neo4j AuraDB',
  'Pinecone Serverless',
  'Kafka adapters',
];

// ================================
// CONNECTIONS
// ================================
export const connections: Connection[] = [
  {
    id: '1',
    platform: 'Slack',
    icon: 'chat',
    workspace: demoCompany.workspaceName,
    status: 'connected',
    channels: 8,
    lastSync: '2 minutes ago',
    messagesIngested: 1247,
  },
  {
    id: '2',
    platform: 'Gmail',
    icon: 'mail',
    workspace: '',
    status: 'coming_soon',
    channels: 0,
    lastSync: '',
    messagesIngested: 0,
  },
  {
    id: '3',
    platform: 'Notion',
    icon: 'library_books',
    workspace: '',
    status: 'coming_soon',
    channels: 0,
    lastSync: '',
    messagesIngested: 0,
  },
  {
    id: '4',
    platform: 'Google Drive',
    icon: 'description',
    workspace: '',
    status: 'coming_soon',
    channels: 0,
    lastSync: '',
    messagesIngested: 0,
  },
  {
    id: '5',
    platform: 'Jira',
    icon: 'checklist',
    workspace: '',
    status: 'coming_soon',
    channels: 0,
    lastSync: '',
    messagesIngested: 0,
  },
  {
    id: '6',
    platform: 'Microsoft Teams',
    icon: 'groups',
    workspace: '',
    status: 'coming_soon',
    channels: 0,
    lastSync: '',
    messagesIngested: 0,
  },
];

export const connectionStats = {
  totalMessages: 1247,
  decisionsCapture: 89,
  activeChannels: 8,
  roadmapConnectors: 5,
};

// ================================
// BRAIN FEED
// ================================
export const brainFeedItems: BrainFeedItem[] = [
  {
    id: '1',
    decision: 'Switched from Stripe to Billplz for the Malaysian market',
    reasoning:
      "Billplz offers stronger local bank integration, lower MYR transaction fees at 1.5% versus Stripe at 3.4%, and FPX direct debit support, which 73% of Northstar's Malaysian users prefer.",
    people: ['Rizal', 'Shafin'],
    channel: '#payments',
    date: '2026-03-25',
    confidence: 'high',
    topic: 'Payment Infrastructure',
  },
  {
    id: '2',
    decision: 'Moved sprint retrospectives from bi-weekly to a weekly cadence',
    reasoning:
      'Team velocity dropped 30% in February, issues were compounding over two-week cycles, and the engineering team preferred shorter retrospectives that support faster course correction.',
    people: ['Andreas', 'Sarah'],
    channel: '#engineering',
    date: '2026-03-24',
    confidence: 'high',
    topic: 'Process',
  },
  {
    id: '3',
    decision: 'Chose Qdrant over pgvector for knowledge retrieval',
    reasoning:
      'Both systems achieved sub-100ms latency at 99% recall, but Qdrant metadata filtering is purpose-built for the exact retrieval pattern needed: filtering by workspace, channel, person, and date range simultaneously.',
    people: ['Andreas', 'Shafin'],
    channel: '#architecture',
    date: '2026-03-23',
    confidence: 'high',
    topic: 'Technical Architecture',
  },
  {
    id: '4',
    decision:
      'Standardized client onboarding to a 5-step playbook with a 48-hour SLA on first contact',
    reasoning:
      'Three client escalations in Q1 traced back to inconsistent onboarding. A structured playbook with assigned owners removes ambiguity and creates an auditable client-facing process.',
    people: ['Priya', 'Rizal'],
    channel: '#client-ops',
    date: '2026-03-20',
    confidence: 'high',
    topic: 'Client Operations',
  },
  {
    id: '5',
    decision:
      'Use Claude Sonnet 4.6 for reasoning extraction and Gemini Flash for classification',
    reasoning:
      'Claude captures conversational subtext more reliably when decisions are implied rather than stated directly. Gemini Flash stays in the pipeline only for fast noise classification and topic tagging where speed matters more than nuance.',
    people: ['Shafin', 'Andreas'],
    channel: '#ai-research',
    date: '2026-03-18',
    confidence: 'high',
    topic: 'AI Infrastructure',
  },
];

// ================================
// ASK - Pre-built sourced responses
// ================================
export const suggestedQuestions = [
  'Why did Northstar switch payment provider?',
  'Why did Northstar choose Qdrant?',
  "Who changed Northstar's sprint retrospective cadence?",
  "What is Northstar's onboarding playbook?",
];

export const askResponses: Record<string, AskResult> = {
  'Why did Northstar switch payment provider?': {
    headline:
      'Northstar switched from Stripe to Billplz because the Malaysia rollout needed lower MYR fees, FPX support, and stronger local bank coverage.',
    answer:
      'The payments team chose Billplz for the Malaysian market after comparing transaction economics, local payment behavior, and integration fit. Converge captured the decision as a high-confidence operating decision with clear owners, source context, and a direct link back to the original Slack thread.',
    decision: 'Switched from Stripe to Billplz for the Malaysian market',
    reasoning: [
      'Billplz lowered MYR transaction fees from 3.4% on Stripe to 1.5%.',
      "It supports FPX direct debit, which 73% of Northstar's Malaysian users prefer.",
      'Its local bank integration matched the requirements for the Malaysia expansion.',
    ],
    topic: 'Payment Infrastructure',
    sources: [
      {
        channel: '#payments',
        date: 'March 25, 2026',
        people: ['Rizal', 'Shafin'],
        reference: 'PAY-2026-03-25-01',
        messagePreview:
          '"Billplz wins on local bank coverage, FPX, and MYR fee economics for the Malaysia launch. We should switch now instead of carrying Stripe into rollout."',
      },
    ],
    confidence: 'high',
  },
  'Why did Northstar choose Qdrant?': {
    headline:
      'Northstar chose Qdrant because it matched pgvector on speed and recall, but handled metadata filtering much better for the retrieval workflow.',
    answer:
      'The architecture team benchmarked Qdrant against pgvector at the same quality threshold and found that raw latency was not the deciding factor. Qdrant was selected because Converge needs reliable filtering across workspace, channel, person, and date range without relying on complex SQL joins.',
    decision: 'Chose Qdrant over pgvector for knowledge retrieval',
    reasoning: [
      'Both options stayed under 100ms latency at a 99% recall threshold.',
      'Qdrant metadata filtering is purpose-built for workspace, channel, person, and date constraints.',
      'pgvector would require more complex SQL joins to support the same retrieval pattern.',
    ],
    topic: 'Technical Architecture',
    sources: [
      {
        channel: '#architecture',
        date: 'March 23, 2026',
        people: ['Andreas', 'Shafin'],
        reference: 'ARCH-2026-03-23-02',
        messagePreview:
          '"Qdrant gives us the filtering shape we need out of the box. pgvector can do it, but we would be rebuilding too much orchestration in SQL."',
      },
    ],
    confidence: 'high',
  },
  "Who changed Northstar's sprint retrospective cadence?": {
    headline:
      'Andreas and Sarah changed the retrospective cadence from bi-weekly to weekly for the engineering team.',
    answer:
      'The change was captured as an engineering process decision after February velocity dropped by 30%. Converge preserved not only who approved the shift, but also the reasoning that weekly retrospectives would shorten feedback loops and help the team correct issues before they compounded.',
    decision: 'Moved sprint retrospectives from bi-weekly to a weekly cadence',
    reasoning: [
      'Engineering velocity dropped 30% in February.',
      'Issues were accumulating across two-week cycles before the team could intervene.',
      'Shorter weekly retrospectives were preferred by the team and allowed faster course correction.',
    ],
    topic: 'Process',
    sources: [
      {
        channel: '#engineering',
        date: 'March 24, 2026',
        people: ['Andreas', 'Sarah'],
        reference: 'ENG-2026-03-24-01',
        messagePreview:
          '"Let us move retros to weekly. The current cadence is too slow for the velocity drop we saw in February, and the team wants shorter sessions with faster follow-up."',
      },
    ],
    confidence: 'high',
  },
  "What is Northstar's onboarding playbook?": {
    headline:
      'Northstar standardized onboarding into a 5-step playbook with a 48-hour SLA on first contact and clearly assigned owners.',
    answer:
      'The client operations team converted onboarding from an inconsistent handoff into a governed playbook that can be audited and repeated. The captured decision defines response timing, ownership, and a five-step structure so teams can onboard clients without losing accountability or context.',
    decision:
      'Standardized client onboarding to a 5-step playbook with a 48-hour SLA on first contact',
    reasoning: [
      'Three client escalations in Q1 were traced back to inconsistent onboarding.',
      'Assigned owners and a fixed playbook reduce ambiguity during handoff.',
      'The 48-hour first-contact SLA creates a measurable operational standard.',
    ],
    topic: 'Client Operations',
    sources: [
      {
        channel: '#client-ops',
        date: 'March 20, 2026',
        people: ['Priya', 'Rizal'],
        reference: 'OPS-2026-03-20-03',
        messagePreview:
          '"We need a five-step onboarding flow with named owners and a 48-hour first-response SLA. Too many escalations came from uneven handoffs this quarter."',
      },
    ],
    confidence: 'high',
  },
  'Why is Northstar using Claude Sonnet 4.6?': {
    headline:
      'Northstar uses Claude Sonnet 4.6 for reasoning extraction because it handles implied decisions and conversational subtext better than lighter models.',
    answer:
      'The AI research team separated the pipeline into two jobs: fast filtering and high-quality reasoning extraction. Gemini Flash handles the cheap classification layer, while Claude Sonnet 4.6 is reserved for threads where the product needs nuanced interpretation of why a team made a decision.',
    decision:
      'Use Claude Sonnet 4.6 for reasoning extraction and Gemini Flash for classification',
    reasoning: [
      'Claude captures conversational subtext when decisions are implied rather than stated directly.',
      'Gemini Flash is faster and cheaper for noise filtering and topic tagging.',
      'Splitting the stack improves cost efficiency without weakening the reasoning layer.',
    ],
    topic: 'AI Infrastructure',
    sources: [
      {
        channel: '#ai-research',
        date: 'March 18, 2026',
        people: ['Shafin', 'Andreas'],
        reference: 'AIR-2026-03-18-01',
        messagePreview:
          '"Gemini stays on the classification layer. Claude is the model that actually understands when a thread ends in an implied decision instead of an explicit one."',
      },
    ],
    confidence: 'high',
  },
};

// ================================
// AUTO DOCS
// ================================
export const autoDocs: AutoDoc[] = [
  {
    id: '1',
    title: 'Northstar Malaysia Payment Provider Selection SOP',
    description:
      'Business-ready SOP covering how Northstar evaluates and approves payment infrastructure for the Malaysian market.',
    generatedDate: '2026-03-25',
    sourceCount: 12,
    status: 'published',
    content: `## 1. Purpose
This SOP defines how Northstar Commerce evaluates and approves payment providers for the Malaysian market using decisions captured from the #payments workspace discussions.

## 2. Approved decision
**Current provider:** Billplz

Northstar selected Billplz over Stripe for the Malaysian rollout because it provides lower MYR fees, stronger local bank integration, and native FPX support.

## 3. Evaluation criteria
| Criteria | Weight | Business reason |
|----------|--------|-----------------|
| Local bank integration | 30% | Must support Malaysian banking workflows without custom reconciliation overhead |
| MYR transaction fees | 25% | Cost target must stay below 2% per transaction |
| FPX support | 20% | 73% of Malaysian users prefer FPX direct debit |
| API reliability | 15% | Engineering team requires stable integration and webhook support |
| Compliance readiness | 10% | Must align with market and finance operations requirements |

## 4. Approval rule
- Payments lead and product lead review shortlisted providers
- Finance confirms fee assumptions before sign-off
- Final choice must include a documented rationale in Converge

## 5. Operational notes
- Stripe remains the fallback option for non-Malaysian checkout paths
- Billplz is the default for MYR checkout and FPX flows
- Re-evaluate only if fee structure, failure rate, or local support quality changes materially

## 6. Source trace
Decision captured in #payments on March 25, 2026 by Rizal and Shafin.`,
  },
  {
    id: '2',
    title: 'Engineering Sprint Governance Playbook',
    description:
      'Operating playbook for sprint cadence, retrospectives, escalation signals, and ownership after the move to weekly retros.',
    generatedDate: '2026-03-24',
    sourceCount: 8,
    status: 'published',
    content: `## 1. Operating rule
Northstar engineering runs two-week sprints with **weekly retrospectives**.

## 2. Why the cadence changed
The previous bi-weekly retrospective model was replaced after velocity dropped 30% in February. Leadership concluded that issues were compounding too slowly for the team to correct in time.

## 3. Weekly retrospective format
- Duration: 30 minutes
- Owners: Andreas and Sarah
- Focus: blockers, delivery risk, and one corrective action for the next sprint week
- Output: a written retrospective note captured in Converge

## 4. Escalation triggers
1. Velocity drops below the prior four-week baseline
2. Repeat blockers appear in consecutive retrospectives
3. A delivery risk remains unresolved for more than one sprint week

## 5. Governance expectation
- Every retrospective must end with a named owner
- Follow-up actions are reviewed in the next weekly session
- Process changes are recorded as explicit decisions, not informal chat outcomes

## 6. Source trace
Decision captured in #engineering on March 24, 2026 by Andreas and Sarah.`,
  },
  {
    id: '3',
    title: 'Client Onboarding Decision Log',
    description:
      'Structured client operations document covering the 5-step onboarding flow, ownership model, and 48-hour first-contact SLA.',
    generatedDate: '2026-03-20',
    sourceCount: 9,
    status: 'published',
    content: `## 1. Decision summary
Northstar standardized client onboarding into a **5-step playbook** with a **48-hour SLA on first contact**.

## 2. Why this was introduced
Three client escalations in Q1 were linked to inconsistent onboarding handoffs. The new process reduces ambiguity and makes client operations auditable.

## 3. Standard onboarding flow
1. First contact confirmed within 48 hours
2. Discovery and workspace requirements captured
3. Technical setup owner assigned
4. Guided activation session scheduled
5. Go-live review completed and logged

## 4. Ownership model
- Client operations owns first contact and status tracking
- Product or solutions lead owns activation readiness
- Any deviation from the standard flow must be documented with a reason

## 5. Review expectation
- Escalations are reviewed monthly
- SLA misses trigger an internal follow-up
- Changes to the playbook require an explicit decision record in Converge

## 6. Source trace
Decision captured in #client-ops on March 20, 2026 by Priya and Rizal.`,
  },
];
