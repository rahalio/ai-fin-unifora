export type UseCaseStatus = 'draft' | 'approved' | 'in_progress' | 'blocked' | 'complete';
export type QualityStatus = 'green' | 'amber' | 'red';
export type SharePathType = 'internal' | 'thirdParty';
export type ShareStatus = 'pending' | 'approved' | 'denied' | 'escalated';
export type SlaStatus = 'healthy' | 'warning' | 'breach';
export type EscalationStatus = 'open' | 'overdue' | 'ruled' | 'closed';

export interface DemoUseCase {
  id: string;
  name: string;
  status: UseCaseStatus;
  wranglingTimeShare: number;
  ttvDueAt: string;
  ttvHit: boolean | null;
  linkedDataProductIds: string[];
  lob: string;
  capacityContention: boolean;
}

export interface DemoDataProduct {
  id: string;
  name: string;
  steward: string;
  qualityStatus: QualityStatus;
  siloSystemCount: number;
  piiClassification: string;
  consumerCount: number;
}

export interface DemoShareRequest {
  id: string;
  pathType: SharePathType;
  status: ShareStatus;
  requester: string;
  dataProductId: string;
  dataProductName: string;
  purpose: string;
  retentionDays: number;
  requestedAt: string;
  tppIdentity?: string;
  consentBasis?: string;
}

export interface DemoReadinessScore {
  useCaseId: string;
  overall: number;
  siloRemoval: number;
  analyticsPlatform: number;
  operationalisedPipelines: number;
  blockingGaps: string[];
}

export interface DemoPipeline {
  id: string;
  name: string;
  owner: string;
  stage: string;
  slaStatus: SlaStatus;
  patchCadence: string;
  useCaseId: string;
  lastBreachAt?: string;
}

export interface DemoEscalation {
  id: string;
  title: string;
  parties: string[];
  deadlineAt: string;
  status: EscalationStatus;
  shareRequestId?: string;
}

export interface DemoCapacityConflict {
  id: string;
  sourceSystem: string;
  projects: string[];
  severity: 'amber' | 'red';
  remediation: string;
}

export interface DemoAttestationControl {
  id: string;
  label: string;
  status: 'pass' | 'gap' | 'pending';
  evidence?: string;
}

export interface DemoPlatformAttestation {
  cloudOwnershipStatement: string;
  lastAttestedAt: string;
  attestedBy: string;
  controls: DemoAttestationControl[];
}

export interface DemoProgrammePulse {
  wranglingTaxMedian: number;
  ttvHitRate: number;
  missedTtvCount: number;
  escalationOverdueCount: number;
  pipelineBreachCount: number;
  openShareCount: number;
  readinessDistribution: { label: string; count: number }[];
}

export interface DemoLineageNode {
  id: string;
  label: string;
  type: 'source' | 'transform' | 'product';
}

export interface DemoLineageEdge {
  from: string;
  to: string;
  rule?: string;
}

export interface DemoLineage {
  dataProductId: string;
  dataProductName: string;
  coveragePercent: number;
  nodes: DemoLineageNode[];
  edges: DemoLineageEdge[];
}

export const useCases: DemoUseCase[] = [
  {
    id: 'uc-aml-fp',
    name: 'AML false-positive reduction',
    status: 'in_progress',
    wranglingTimeShare: 0.58,
    ttvDueAt: '2026-03-31T23:59:59Z',
    ttvHit: null,
    linkedDataProductIds: ['dp-kyc-golden', 'dp-txn-enriched'],
    lob: 'Financial crime',
    capacityContention: false,
  },
  {
    id: 'uc-virtual-agent',
    name: 'Virtual agent — retail servicing',
    status: 'approved',
    wranglingTimeShare: 0.71,
    ttvDueAt: '2026-06-30T23:59:59Z',
    ttvHit: null,
    linkedDataProductIds: ['dp-customer-360'],
    lob: 'Retail banking',
    capacityContention: true,
  },
  {
    id: 'uc-post-trade-rpa',
    name: 'Post-trade RPA reconciliation',
    status: 'blocked',
    wranglingTimeShare: 0.82,
    ttvDueAt: '2025-12-31T23:59:59Z',
    ttvHit: false,
    linkedDataProductIds: [],
    lob: 'Markets ops',
    capacityContention: false,
  },
  {
    id: 'uc-credit-decision',
    name: 'Credit decisioning augmentation',
    status: 'complete',
    wranglingTimeShare: 0.34,
    ttvDueAt: '2025-09-30T23:59:59Z',
    ttvHit: true,
    linkedDataProductIds: ['dp-kyc-golden', 'dp-customer-360'],
    lob: 'Retail lending',
    capacityContention: false,
  },
];

export const dataProducts: DemoDataProduct[] = [
  {
    id: 'dp-kyc-golden',
    name: 'KYC golden record',
    steward: 'A. Chen',
    qualityStatus: 'green',
    siloSystemCount: 3,
    piiClassification: 'Restricted PII',
    consumerCount: 4,
  },
  {
    id: 'dp-txn-enriched',
    name: 'Enriched transaction feed',
    steward: 'M. Okonkwo',
    qualityStatus: 'amber',
    siloSystemCount: 5,
    piiClassification: 'Internal',
    consumerCount: 2,
  },
  {
    id: 'dp-customer-360',
    name: 'Customer 360 — retail',
    steward: 'S. Patel',
    qualityStatus: 'green',
    siloSystemCount: 4,
    piiClassification: 'Restricted PII',
    consumerCount: 6,
  },
  {
    id: 'dp-trade-ledger',
    name: 'Post-trade ledger normalised',
    steward: '—',
    qualityStatus: 'red',
    siloSystemCount: 7,
    piiClassification: 'Confidential',
    consumerCount: 0,
  },
];

export const shareRequests: DemoShareRequest[] = [
  {
    id: 'shr-001',
    pathType: 'internal',
    status: 'pending',
    requester: 'Retail AI squad',
    dataProductId: 'dp-customer-360',
    dataProductName: 'Customer 360 — retail',
    purpose: 'Virtual agent feature store — servicing context only',
    retentionDays: 90,
    requestedAt: '2026-09-10T09:00:00Z',
  },
  {
    id: 'shr-002',
    pathType: 'internal',
    status: 'pending',
    requester: 'Markets ops analytics',
    dataProductId: 'dp-txn-enriched',
    dataProductName: 'Enriched transaction feed',
    purpose: 'AML model retraining — supervised labels',
    retentionDays: 180,
    requestedAt: '2026-09-12T14:30:00Z',
  },
  {
    id: 'shr-003',
    pathType: 'internal',
    status: 'approved',
    requester: 'Financial crime ML',
    dataProductId: 'dp-kyc-golden',
    dataProductName: 'KYC golden record',
    purpose: 'False-positive reduction — entity resolution',
    retentionDays: 365,
    requestedAt: '2026-08-01T11:00:00Z',
  },
  {
    id: 'shr-004',
    pathType: 'thirdParty',
    status: 'pending',
    requester: 'Open banking channel',
    dataProductId: 'dp-customer-360',
    dataProductName: 'Customer 360 — retail',
    purpose: 'Account information — PSD2 AIS scenario',
    retentionDays: 30,
    requestedAt: '2026-09-13T08:00:00Z',
    tppIdentity: 'TPP: FinServe Aggregator Ltd',
    consentBasis: 'Explicit customer consent (PSD2 SCA)',
  },
  {
    id: 'shr-005',
    pathType: 'thirdParty',
    status: 'approved',
    requester: 'Partner analytics',
    dataProductId: 'dp-txn-enriched',
    dataProductName: 'Enriched transaction feed',
    purpose: 'Aggregated spend insights — minimised fields',
    retentionDays: 14,
    requestedAt: '2026-08-20T10:00:00Z',
    tppIdentity: 'TPP: SpendInsight GmbH',
    consentBasis: 'GDPR Art. 6(1)(a) — opt-in',
  },
];

export const readinessScores: Record<string, DemoReadinessScore> = {
  'uc-aml-fp': {
    useCaseId: 'uc-aml-fp',
    overall: 78,
    siloRemoval: 82,
    analyticsPlatform: 75,
    operationalisedPipelines: 76,
    blockingGaps: ['Lineage coverage below 90% on txn feed'],
  },
  'uc-virtual-agent': {
    useCaseId: 'uc-virtual-agent',
    overall: 64,
    siloRemoval: 70,
    analyticsPlatform: 58,
    operationalisedPipelines: 65,
    blockingGaps: ['Share approval pending', 'Capacity conflict on customer source'],
  },
  'uc-post-trade-rpa': {
    useCaseId: 'uc-post-trade-rpa',
    overall: 22,
    siloRemoval: 15,
    analyticsPlatform: 30,
    operationalisedPipelines: 20,
    blockingGaps: ['No stewarded datasets linked', 'Trade ledger quality red'],
  },
  'uc-credit-decision': {
    useCaseId: 'uc-credit-decision',
    overall: 91,
    siloRemoval: 88,
    analyticsPlatform: 94,
    operationalisedPipelines: 92,
    blockingGaps: [],
  },
};

export const pipelines: DemoPipeline[] = [
  {
    id: 'pipe-aml-scoring',
    name: 'AML FP scoring pipeline',
    owner: 'M. Okonkwo',
    stage: 'production',
    slaStatus: 'healthy',
    patchCadence: 'Monthly',
    useCaseId: 'uc-aml-fp',
  },
  {
    id: 'pipe-agent-inference',
    name: 'Virtual agent inference',
    owner: 'S. Patel',
    stage: 'staging',
    slaStatus: 'warning',
    patchCadence: 'Bi-weekly',
    useCaseId: 'uc-virtual-agent',
  },
  {
    id: 'pipe-trade-recon',
    name: 'Post-trade recon RPA',
    owner: '—',
    stage: 'development',
    slaStatus: 'breach',
    patchCadence: 'None',
    useCaseId: 'uc-post-trade-rpa',
    lastBreachAt: '2026-09-01T06:00:00Z',
  },
  {
    id: 'pipe-credit-features',
    name: 'Credit feature store refresh',
    owner: 'A. Chen',
    stage: 'production',
    slaStatus: 'healthy',
    patchCadence: 'Weekly',
    useCaseId: 'uc-credit-decision',
  },
];

export const escalations: DemoEscalation[] = [
  {
    id: 'esc-001',
    title: 'Markets silo veto — trade ledger access',
    parties: ['Markets CIO', 'Group CDO', 'Data steward (vacant)'],
    deadlineAt: '2026-09-08T17:00:00Z',
    status: 'overdue',
    shareRequestId: 'shr-002',
  },
  {
    id: 'esc-002',
    title: 'Retail vs compliance — customer 360 fields',
    parties: ['Retail LOB CIO', 'Compliance lead', 'Group CDO'],
    deadlineAt: '2026-09-20T12:00:00Z',
    status: 'open',
  },
  {
    id: 'esc-003',
    title: 'TPP minimisation dispute — txn aggregates',
    parties: ['Open banking lead', 'DPO', 'Partner management'],
    deadlineAt: '2026-09-05T09:00:00Z',
    status: 'ruled',
    shareRequestId: 'shr-005',
  },
];

export const capacityConflicts: DemoCapacityConflict[] = [
  {
    id: 'cap-001',
    sourceSystem: 'Core banking — customer master',
    projects: ['Virtual agent', 'Credit decisioning refresh'],
    severity: 'amber',
    remediation: 'Stagger batch windows; reserve ETL slot Thu 02:00–06:00',
  },
  {
    id: 'cap-002',
    sourceSystem: 'Trade capture — uncleansed feeds',
    projects: ['Post-trade RPA', 'AML FP reduction'],
    severity: 'red',
    remediation: 'Block new in-progress until steward publishes trade ledger product',
  },
];

export const platformAttestation: DemoPlatformAttestation = {
  cloudOwnershipStatement:
    'Institution retains data-protection ownership under cloud analytics platform. Sub-processors mapped; encryption at rest and in transit attested.',
  lastAttestedAt: '2026-08-15T14:00:00Z',
  attestedBy: 'Security architecture board',
  controls: [
    { id: 'ctl-resilience', label: 'Platform resiliency — RTO/RPO met', status: 'pass', evidence: 'DR test Q2 2026' },
    { id: 'ctl-encrypt', label: 'Encryption — at rest & in transit', status: 'pass' },
    { id: 'ctl-access', label: 'Privileged access review', status: 'gap', evidence: 'Q3 review overdue' },
    { id: 'ctl-logging', label: 'Audit logging completeness', status: 'pass' },
    { id: 'ctl-dpa', label: 'Cloud DPA alignment', status: 'pending' },
  ],
};

export const programmePulse: DemoProgrammePulse = {
  wranglingTaxMedian: 0.62,
  ttvHitRate: 0.67,
  missedTtvCount: 1,
  escalationOverdueCount: 1,
  pipelineBreachCount: 1,
  openShareCount: 3,
  readinessDistribution: [
    { label: 'Ready (≥80)', count: 1 },
    { label: 'Provisional (60–79)', count: 2 },
    { label: 'Blocked (<60)', count: 1 },
  ],
};

export const lineageByProduct: Record<string, DemoLineage> = {
  'dp-kyc-golden': {
    dataProductId: 'dp-kyc-golden',
    dataProductName: 'KYC golden record',
    coveragePercent: 94,
    nodes: [
      { id: 'src-crm', label: 'CRM — retail', type: 'source' },
      { id: 'src-kyc-vendor', label: 'KYC vendor feed', type: 'source' },
      { id: 'xf-entity', label: 'Entity resolution', type: 'transform' },
      { id: 'xf-dedupe', label: 'Dedup & survivorship', type: 'transform' },
      { id: 'prod-kyc', label: 'KYC golden record', type: 'product' },
    ],
    edges: [
      { from: 'src-crm', to: 'xf-entity', rule: 'PII normalisation' },
      { from: 'src-kyc-vendor', to: 'xf-entity', rule: 'Vendor ID mapping' },
      { from: 'xf-entity', to: 'xf-dedupe', rule: 'Match key generation' },
      { from: 'xf-dedupe', to: 'prod-kyc', rule: 'Golden record publish' },
    ],
  },
};

export function getDataProductName(id: string): string {
  return dataProducts.find((p) => p.id === id)?.name ?? id;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
