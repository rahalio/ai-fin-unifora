export type OperatorRole =
  | 'cdo'
  | 'ai_lead'
  | 'steward'
  | 'model_ops'
  | 'compliance'
  | 'lob_cio'
  | 'executive';

export const ROLE_HOME: Record<OperatorRole, string> = {
  cdo: '/',
  ai_lead: '/use-cases',
  steward: '/shares',
  model_ops: '/pipelines',
  compliance: '/lineage',
  lob_cio: '/data-products',
  executive: '/escalations',
};

export const ROLE_LABELS: Record<OperatorRole, string> = {
  cdo: 'Chief data officer',
  ai_lead: 'AI project lead',
  steward: 'Data steward',
  model_ops: 'Model ops engineer',
  compliance: 'Risk / compliance',
  lob_cio: 'LOB CIO',
  executive: 'Executive forum',
};

export const ROLE_STORAGE_KEY = 'unifora.role';

export function getStoredRole(): OperatorRole {
  if (typeof window === 'undefined') return 'cdo';
  const stored = localStorage.getItem(ROLE_STORAGE_KEY);
  if (stored && stored in ROLE_HOME) return stored as OperatorRole;
  return 'cdo';
}
