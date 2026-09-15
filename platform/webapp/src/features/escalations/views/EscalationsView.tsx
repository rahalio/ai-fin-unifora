'use client';

import { PageHeader, Panel, StatusChip, Stat } from '@/components/ui';
import { daysUntil, escalations, formatDate } from '@/lib/demo-data';

export function EscalationsView() {
  const overdueCount = escalations.filter((e) => e.status === 'overdue').length;

  return (
    <div>
      <PageHeader
        title="Escalation forum"
        subtitle="Named executive forum with deadlines for silo disputes — no pocket veto by silence."
      />

      <Panel title="Queue overview" className="mb-4">
        <Stat
          label="Overdue cases"
          value={overdueCount}
          tone={overdueCount > 0 ? 'slip' : 'clear'}
        />
      </Panel>

      <Panel title="Cases">
        <ul className="space-y-4">
          {escalations.map((e) => {
            const days = daysUntil(e.deadlineAt);
            return (
              <li
                key={e.id}
                className={`border p-4 ${
                  e.status === 'overdue'
                    ? 'border-yard-slip/50 bg-yard-slip/5'
                    : 'border-white/10'
                }`}
                role={e.status === 'overdue' ? 'alert' : undefined}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="mt-1 text-xs text-graphite-400">
                      Parties: {e.parties.join(' · ')}
                    </p>
                  </div>
                  <StatusChip status={e.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span>
                    <span className="text-xs uppercase text-graphite-400">Deadline: </span>
                    {formatDate(e.deadlineAt)}
                    {e.status === 'open' && (
                      <span className="ml-2 text-graphite-400">
                        ({days >= 0 ? `${days}d left` : `${Math.abs(days)}d overdue`})
                      </span>
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
