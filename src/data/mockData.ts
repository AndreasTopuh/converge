// ================================
// CONVERGE MVP - Mock Data for Demo
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

export interface AskResult {
  answer: string;
  sources: {
    channel: string;
    date: string;
    people: string[];
    messagePreview: string;
  }[];
  confidence: 'high' | 'medium';
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
  workspaceSubtitle: 'Malaysia expansion, product, and operations workspace',
  description:
    'A fictional growth-stage commerce company used across the Converge demo. The workspace combines payments, engineering, client operations, and AI research decisions in one searchable system.',
};

export const mvpStack = [
  'Slack Events API',
  'BullMQ',
  'Redis',
  'Gemini Flash',
  'Claude Sonnet 4.6',
  'Qdrant Cloud',
  'Supabase',
  'LlamaIndex',
  'Next.js',
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
    platform: 'Google Drive',
    icon: 'library_books',
    workspace: '',
    status: 'coming_soon',
    channels: 0,
    lastSync: '',
    messagesIngested: 0,
  },
  {
    id: '4',
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
  knowledgeItems: 156,
};

// ================================
// BRAIN FEED
// ================================
export const brainFeedItems: BrainFeedItem[] = [
  {
    id: '1',
    decision: 'Switched Northstar Malaysia payments from Stripe to Billplz',
    reasoning:
      'Billplz has better local bank integration, lower transaction fees for MYR payments at 1.5% versus 3.4%, and supports FPX direct debit which 73% of our Malaysian users prefer.',
    people: ['Shafin', 'Sherman', 'Andreas'],
    channel: '#payments',
    date: '2026-03-25',
    confidence: 'high',
    topic: 'Payment Infrastructure',
  },
  {
    id: '2',
    decision: 'Moved Northstar engineering retrospectives to a weekly cadence',
    reasoning:
      'Team velocity dropped 30% in February. Analysis showed issues were compounding over two-week cycles. Weekly retros allow faster course correction and the team preferred shorter, more focused sessions.',
    people: ['Sherman', 'Celeste'],
    channel: '#engineering',
    date: '2026-03-24',
    confidence: 'high',
    topic: 'Process',
  },
  {
    id: '3',
    decision: 'Chose Qdrant over pgvector for Northstar knowledge retrieval',
    reasoning:
      'Benchmarked both at a 99% recall threshold and both achieved sub-100ms latency. Qdrant metadata filtering is purpose-built for our use case: filter by workspace, channel, person, and date range simultaneously.',
    people: ['Shafin', 'Andreas'],
    channel: '#architecture',
    date: '2026-03-23',
    confidence: 'high',
    topic: 'Technical Architecture',
  },
  {
    id: '4',
    decision: 'Extended Northstar client onboarding from 3 days to 5 days',
    reasoning:
      'Customer churn data showed 40% of churned clients cited "did not understand the product" within the first month. Adding 2 extra onboarding days with hands-on workshops reduced confusion and improved activation rates.',
    people: ['Aishah', 'Sherman'],
    channel: '#client-ops',
    date: '2026-03-22',
    confidence: 'high',
    topic: 'Client Operations',
  },
  {
    id: '5',
    decision: 'Use Claude Sonnet 4.6 for reasoning extraction instead of GPT-4',
    reasoning:
      'Tested both on 200 Slack threads. Claude correctly identified implicit decisions in 87% of cases versus GPT-4 at 71%. Claude also handled Malaysian English colloquialisms better and produced more natural structured output.',
    people: ['Shafin'],
    channel: '#ai-research',
    date: '2026-03-21',
    confidence: 'high',
    topic: 'AI/ML',
  },
  {
    id: '6',
    decision: 'Postponed mobile app development to Q3',
    reasoning:
      'Usage data shows 94% of interactions happen on desktop during work hours. Mobile adds complexity without proportional value right now. The team will revisit after hitting 100 paying customers.',
    people: ['Sherman', 'Shafin', 'Celeste'],
    channel: '#product',
    date: '2026-03-20',
    confidence: 'medium',
    topic: 'Product Strategy',
  },
  {
    id: '7',
    decision: 'Standardized vendor evaluation criteria to 5 core metrics',
    reasoning:
      'Previous vendor evaluations used inconsistent criteria across teams. The new standard covers cost, integration effort, support quality, compliance, and scalability. This reduces evaluation time from 2 weeks to 3 days.',
    people: ['Celeste', 'Aishah'],
    channel: '#procurement',
    date: '2026-03-19',
    confidence: 'medium',
    topic: 'Operations',
  },
];

// ================================
// ASK ANYTHING - Pre-built Q&A
// ================================
export const suggestedQuestions = [
  'Why did Northstar switch payment provider?',
  'Why did Northstar choose Qdrant?',
  "Who changed Northstar's sprint retrospective cadence?",
  "What is Northstar's onboarding playbook?",
  'Why is Northstar using Claude Sonnet 4.6?',
  'When did Northstar postpone the mobile app?',
];

export const askResponses: Record<string, AskResult> = {
  'Why did Northstar switch payment provider?': {
    answer:
      "Northstar Commerce switched from Stripe to Billplz for its Malaysia rollout. The decision was driven by better local bank integration, lower transaction fees for MYR payments at 1.5% compared to Stripe's 3.4%, and FPX direct debit support, which 73% of Northstar's Malaysian users prefer.",
    sources: [
      {
        channel: '#payments',
        date: 'March 25, 2026',
        people: ['Shafin', 'Sherman', 'Andreas'],
        messagePreview:
          '"After comparing Stripe vs Billplz for 2 weeks, Billplz wins on every metric that matters for our Malaysian users..."',
      },
    ],
    confidence: 'high',
  },
  'Why did Northstar choose Qdrant?': {
    answer:
      "Northstar Commerce chose Qdrant over pgvector after benchmarking both solutions. At a 99% recall threshold, both achieved sub-100ms latency. The deciding factor was Qdrant's metadata filtering capability, which fits the need to filter by workspace, channel, person, and date range simultaneously.",
    sources: [
      {
        channel: '#architecture',
        date: 'March 23, 2026',
        people: ['Shafin', 'Andreas'],
        messagePreview:
          '"Benchmarked Qdrant vs pgvector. Both hit sub-100ms at 99% recall, but Qdrant metadata filtering is exactly what we need..."',
      },
    ],
    confidence: 'high',
  },
  "Who changed Northstar's sprint retrospective cadence?": {
    answer:
      'Sherman and Celeste approved the change from bi-weekly to weekly sprint retrospectives for the Northstar engineering team. The shift was prompted by a 30% drop in team velocity during February 2026, and the team preferred shorter, more focused sessions for faster course correction.',
    sources: [
      {
        channel: '#engineering',
        date: 'March 24, 2026',
        people: ['Sherman', 'Celeste'],
        messagePreview:
          '"Team velocity dropped 30% in February. We need to switch to weekly retros because issues are compounding over two weeks..."',
      },
    ],
    confidence: 'high',
  },
  "What is Northstar's onboarding playbook?": {
    answer:
      'Northstar extended its client onboarding process from 3 days to 5 days after churn data revealed that 40% of churned clients said they did not understand the product within their first month. The additional 2 days include hands-on workshops designed to improve activation rates and reduce confusion during setup.',
    sources: [
      {
        channel: '#client-ops',
        date: 'March 22, 2026',
        people: ['Aishah', 'Sherman'],
        messagePreview:
          '"40% of churned clients said they did not understand the product. We need to add 2 more onboarding days with workshops..."',
      },
    ],
    confidence: 'high',
  },
  'Why is Northstar using Claude Sonnet 4.6?': {
    answer:
      'Northstar uses Claude Sonnet 4.6 for reasoning extraction after testing both models on 200 Slack threads. Claude identified implicit decisions in 87% of cases compared to GPT-4 at 71%, and it handled Malaysian English colloquialisms better while producing more natural structured JSON output.',
    sources: [
      {
        channel: '#ai-research',
        date: 'March 21, 2026',
        people: ['Shafin'],
        messagePreview:
          '"Tested Claude vs GPT-4 on 200 threads. Claude gets 87% implicit decision accuracy vs 71%, and it handles our Malaysian English much better..."',
      },
    ],
    confidence: 'high',
  },
  'When did Northstar postpone the mobile app?': {
    answer:
      'Northstar postponed the mobile app to Q3 2026 on March 20, 2026. The decision was based on usage data showing 94% of interactions happen on desktop during work hours. The team concluded that mobile adds complexity without proportional value at the current stage and will revisit after reaching 100 paying customers.',
    sources: [
      {
        channel: '#product',
        date: 'March 20, 2026',
        people: ['Sherman', 'Shafin', 'Celeste'],
        messagePreview:
          '"94% desktop usage during work hours. Mobile is a distraction right now, so let us revisit at 100 paying customers..."',
      },
    ],
    confidence: 'medium',
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
      'Northstar Commerce SOP for evaluating and selecting payment providers for the Malaysian market, compiled from 12 decision threads.',
    generatedDate: '2026-03-25',
    sourceCount: 12,
    status: 'published',
    content: `## 1. Overview
This SOP outlines how Northstar Commerce evaluates payment providers for the Malaysian market, based on decisions captured from the #payments and #procurement channels.

## 2. Selection Criteria
Based on team discussions (Shafin, Sherman, Andreas - March 2026):

| Criteria | Weight | Notes |
|----------|--------|-------|
| Local bank integration | 30% | Must support Malaysian banks directly |
| Transaction fees (MYR) | 25% | Target below 2% per transaction |
| FPX support | 20% | 73% of Malaysian users prefer FPX |
| API documentation | 15% | Must have Node.js SDK |
| Compliance (BNM) | 10% | Bank Negara Malaysia requirements |

## 3. Current Decision
**Selected: Billplz** - Lower fees at 1.5% versus Stripe's 3.4%, native FPX support, and direct Malaysian bank integration.

## 4. Review Schedule
Quarterly review - next evaluation: June 2026.`,
  },
  {
    id: '2',
    title: 'Northstar Engineering Sprint Process',
    description:
      'Sprint process document for the Northstar engineering team, reflecting the switch to weekly retrospectives and compiled from 8 decision threads.',
    generatedDate: '2026-03-24',
    sourceCount: 8,
    status: 'published',
    content: `## 1. Sprint Cadence
- **Sprint length:** 2 weeks
- **Retrospectives:** Weekly (changed from bi-weekly, March 2026)
- **Sprint planning:** Monday mornings

## 2. Retrospective Format
Based on team agreement (Sherman, Celeste - March 2026):
- Duration: 30 minutes (down from 60)
- Format: Start / Stop / Continue
- Action items limited to 3 per session

## 3. Velocity Tracking
- Track weekly velocity via Linear
- Flag if velocity drops below 80% of 4-week average
- Trigger root-cause analysis at 70% threshold

## 4. Rationale
Bi-weekly retrospectives allowed issues to compound. Weekly format enables faster course correction with a 30% velocity improvement observed in the first 2 weeks of implementation.`,
  },
  {
    id: '3',
    title: 'Northstar Client Onboarding Playbook',
    description:
      'Step-by-step onboarding guide for Northstar Commerce clients, compiled from 15 decision threads across client-ops and product channels.',
    generatedDate: '2026-03-23',
    sourceCount: 15,
    status: 'published',
    content: `## 1. Onboarding Timeline
**Total duration: 5 days** (extended from 3 days, March 2026)

### Day 1-2: Setup and Configuration
- Workspace provisioning
- Slack bot installation and channel selection
- Initial data sync and verification

### Day 3-4: Hands-on Workshop
- Live demonstration of Ask Anything
- Team training on knowledge tagging
- Custom query template creation

### Day 5: Go-Live and Verification
- Production data ingestion begins
- First knowledge report generated
- Success metrics baseline established

## 2. Why 5 Days
40% of churned clients cited "did not understand the product" within the first month. Extended onboarding with workshops reduced this to 12%.

## 3. Success Metrics
- Client completes 10+ queries in the first week
- At least 3 team members actively use the system
- First Auto Doc generated within 14 days`,
  },
  {
    id: '4',
    title: 'Northstar Vendor Evaluation Framework',
    description:
      'Standardized criteria for evaluating technology vendors for Northstar Commerce, compiled from 6 decision threads.',
    generatedDate: '2026-03-20',
    sourceCount: 6,
    status: 'draft',
    content: `## 1. Core Evaluation Metrics
Standardized by Celeste and Aishah (March 2026):

1. **Cost** - Total cost of ownership over 12 months
2. **Integration Effort** - Days to integrate with the existing stack
3. **Support Quality** - Response time SLA and documentation quality
4. **Compliance** - PDPA, SOC2, and industry-specific requirements
5. **Scalability** - Performance at 10x current load

## 2. Evaluation Process
- Maximum 3 business days for evaluation
- Minimum 2 team members per evaluation
- Score each metric 1-5, weighted equally
- Minimum score: 3.5 / 5 to proceed

## 3. Previous Evaluation Time
Reduced from 2 weeks to 3 days using this framework.`,
  },
];
