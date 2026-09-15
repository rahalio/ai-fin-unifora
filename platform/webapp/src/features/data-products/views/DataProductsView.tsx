'use client';

import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { dataProducts } from '@/lib/demo-data';

export function DataProductsView() {
  return (
    <div>
      <PageHeader
        brandStamp
        title="Data product catalogue"
        subtitle="Steward-owned cleansed products reusable across AML, agents, desk, and post-trade."
      />

      <Panel title="Products">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-graphite-400">
                <th className="pb-3 pr-4 font-medium">Product</th>
                <th className="pb-3 pr-4 font-medium">Steward</th>
                <th className="pb-3 pr-4 font-medium">Quality</th>
                <th className="pb-3 pr-4 font-medium">Silo sources</th>
                <th className="pb-3 pr-4 font-medium">PII class</th>
                <th className="pb-3 font-medium">Consumers</th>
              </tr>
            </thead>
            <tbody>
              {dataProducts.map((p) => (
                <tr key={p.id} className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-graphite-200">{p.name}</p>
                    <p className="font-mono text-xs text-graphite-400">{p.id}</p>
                  </td>
                  <td className="py-3 pr-4">
                    {p.steward === '—' ? (
                      <span className="text-xs text-yard-hold">Unassigned — cannot link</span>
                    ) : (
                      p.steward
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusChip status={p.qualityStatus} />
                  </td>
                  <td className="py-3 pr-4 font-mono tabular-nums">{p.siloSystemCount}</td>
                  <td className="py-3 pr-4 text-xs">{p.piiClassification}</td>
                  <td className="py-3 font-mono tabular-nums">{p.consumerCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="LOB transparency" className="mt-4">
        <p className="text-sm text-graphite-400">
          Federation ≠ confiscation — LOB CIOs see which use cases consume their stewarded
          products. Orphan products without stewards show amber and block new use-case links.
        </p>
      </Panel>
    </div>
  );
}
