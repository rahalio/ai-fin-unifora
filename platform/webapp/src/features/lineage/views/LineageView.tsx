'use client';

import { useState } from 'react';
import { PageHeader, Panel, Stat } from '@/components/ui';
import { lineageByProduct } from '@/lib/demo-data';

export function LineageView() {
  const [exporting, setExporting] = useState(false);
  const lineage = lineageByProduct['dp-kyc-golden'];

  function handleExport() {
    setExporting(true);
    setTimeout(() => setExporting(false), 1200);
  }

  return (
    <div>
      <PageHeader
        brandStamp
        title="Lineage & quality evidence"
        subtitle="Exportable lineage for regulatory and client transparency — scoped to purpose."
      />

      <Panel
        title={lineage.dataProductName}
        action={
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="border border-signal/50 px-3 py-1 text-xs font-medium text-signal hover:bg-signal/10 disabled:opacity-50"
          >
            {exporting ? 'Building pack…' : 'Export lineage pack'}
          </button>
        }
      >
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Stat
            label="Coverage"
            value={`${lineage.coveragePercent}%`}
            tone={lineage.coveragePercent >= 90 ? 'clear' : 'hold'}
          />
          <Stat label="Nodes" value={lineage.nodes.length} tone="mute" />
          <Stat label="Edges" value={lineage.edges.length} tone="mute" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-graphite-400">Nodes</p>
            <ul className="space-y-1 border border-white/10">
              {lineage.nodes.map((n) => (
                <li
                  key={n.id}
                  className="flex items-center justify-between border-b border-white/5 px-3 py-2 text-sm last:border-0"
                >
                  <span className="font-mono text-xs text-graphite-400">{n.id}</span>
                  <span>{n.label}</span>
                  <span className="text-xs uppercase text-graphite-400">{n.type}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-graphite-400">Edges</p>
            <ul className="space-y-1 border border-white/10">
              {lineage.edges.map((e, i) => (
                <li
                  key={`${e.from}-${e.to}-${i}`}
                  className="border-b border-white/5 px-3 py-2 text-sm font-mono last:border-0"
                >
                  <span className="text-graphite-400">{e.from}</span>
                  <span className="mx-2 text-signal">→</span>
                  <span className="text-graphite-400">{e.to}</span>
                  {e.rule && (
                    <p className="mt-0.5 text-xs text-graphite-400 normal-case">{e.rule}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}
