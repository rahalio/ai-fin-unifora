'use client';

import Link from 'next/link';
import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { formatDate, pipelines, useCases } from '@/lib/demo-data';

export function PipelinesView() {
  return (
    <div>
      <PageHeader
        title="Pipeline ops registry"
        subtitle="Train / validate / deploy / monitor / patch with owners and SLAs like infrastructure."
      />

      <Panel title="Pipelines">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-graphite-400">
                <th className="pb-3 pr-4 font-medium">Pipeline</th>
                <th className="pb-3 pr-4 font-medium">Owner</th>
                <th className="pb-3 pr-4 font-medium">Stage</th>
                <th className="pb-3 pr-4 font-medium">SLA</th>
                <th className="pb-3 pr-4 font-medium">Patch cadence</th>
                <th className="pb-3 font-medium">Use case</th>
              </tr>
            </thead>
            <tbody>
              {pipelines.map((p) => {
                const uc = useCases.find((u) => u.id === p.useCaseId);
                return (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-3 pr-4">
                      <p className="font-medium">{p.name}</p>
                      <p className="font-mono text-xs text-graphite-400">{p.id}</p>
                      {p.lastBreachAt && (
                        <p className="text-xs text-yard-slip">
                          Breach {formatDate(p.lastBreachAt)}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      {p.owner === '—' ? (
                        <span className="text-yard-slip text-xs">Unowned</span>
                      ) : (
                        p.owner
                      )}
                    </td>
                    <td className="py-3 pr-4 capitalize">{p.stage}</td>
                    <td className="py-3 pr-4">
                      <StatusChip status={p.slaStatus} />
                    </td>
                    <td className="py-3 pr-4">{p.patchCadence}</td>
                    <td className="py-3">
                      {uc ? (
                        <Link href="/use-cases" className="text-xs hover:text-signal">
                          {uc.name}
                        </Link>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
