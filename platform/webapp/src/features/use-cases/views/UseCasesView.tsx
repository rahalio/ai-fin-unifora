'use client';

import Link from 'next/link';
import { PageHeader, Panel, StatusChip } from '@/components/ui';
import {
  daysUntil,
  formatDate,
  getDataProductName,
  readinessScores,
  useCases,
} from '@/lib/demo-data';

export function UseCasesView() {
  return (
    <div>
      <PageHeader
        brandStamp
        title="AI use-case register"
        subtitle="Approved use cases with TTV gates and linked stewarded datasets — build cannot count in progress without them."
      />

      <Panel title="Use cases">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-graphite-400">
                <th className="pb-3 pr-4 font-medium">Use case</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Wrangling share</th>
                <th className="pb-3 pr-4 font-medium">TTV gate</th>
                <th className="pb-3 pr-4 font-medium">Readiness</th>
                <th className="pb-3 font-medium">Linked products</th>
              </tr>
            </thead>
            <tbody>
              {useCases.map((uc) => {
                const score = readinessScores[uc.id];
                const canProgress =
                  uc.linkedDataProductIds.length > 0 && (score?.overall ?? 0) >= 60;
                const days = daysUntil(uc.ttvDueAt);
                return (
                  <tr key={uc.id} className="border-b border-white/5">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-graphite-200">{uc.name}</p>
                      <p className="text-xs text-graphite-400">{uc.lob}</p>
                      {uc.capacityContention && (
                        <Link
                          href="/capacity"
                          className="text-xs text-yard-hold hover:underline"
                        >
                          Capacity contention →
                        </Link>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusChip status={uc.status} />
                      {uc.status === 'blocked' && !canProgress && (
                        <p className="mt-1 text-xs text-yard-slip">
                          In progress gated — link stewarded datasets
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4 font-mono tabular-nums">
                      {Math.round(uc.wranglingTimeShare * 100)}%
                    </td>
                    <td className="py-3 pr-4">
                      <p className="font-mono text-xs">{formatDate(uc.ttvDueAt)}</p>
                      {uc.ttvHit === false ? (
                        <span className="text-xs text-yard-slip">Missed</span>
                      ) : uc.ttvHit === true ? (
                        <span className="text-xs text-yard-clear">Hit</span>
                      ) : (
                        <span className="text-xs text-graphite-400">
                          {days >= 0 ? `${days}d left` : `${Math.abs(days)}d overdue`}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      {score ? (
                        <Link href="/readiness" className="font-mono hover:text-signal">
                          {score.overall}
                        </Link>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3">
                      {uc.linkedDataProductIds.length === 0 ? (
                        <span className="text-xs text-yard-slip">None linked</span>
                      ) : (
                        <ul className="space-y-0.5 text-xs font-mono">
                          {uc.linkedDataProductIds.map((id) => (
                            <li key={id}>
                              <Link href="/data-products" className="hover:text-signal">
                                {getDataProductName(id)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Mark in progress" className="mt-4">
        <p className="text-sm text-graphite-400">
          Programme policy: a use case cannot move to in progress until at least one stewarded
          data product is linked and Finextra readiness score is ≥60. Post-trade RPA is blocked
          pending trade ledger steward assignment.
        </p>
      </Panel>
    </div>
  );
}
