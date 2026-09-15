'use client';

import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { capacityConflicts } from '@/lib/demo-data';

export function CapacityView() {
  return (
    <div>
      <PageHeader
        title="Capacity planner"
        subtitle="Concurrent AI projects must not thrash the same uncleansed sources without a plan."
      />

      <Panel title="Source conflicts">
        <ul className="space-y-4">
          {capacityConflicts.map((c) => (
            <li
              key={c.id}
              className="border border-white/10 bg-graphite-900/50 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-graphite-200">{c.sourceSystem}</p>
                  <p className="mt-1 text-xs text-graphite-400">
                    Projects: {c.projects.join(', ')}
                  </p>
                </div>
                <StatusChip status={c.severity} />
              </div>
              <p className="mt-3 text-sm text-graphite-400">
                <span className="text-xs uppercase text-graphite-400">Remediation: </span>
                {c.remediation}
              </p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Policy" className="mt-4">
        <p className="text-sm text-graphite-400">
          Conflict without remediation plan blocks new in-progress use cases on contested sources.
        </p>
      </Panel>
    </div>
  );
}
