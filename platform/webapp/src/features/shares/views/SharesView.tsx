'use client';

import { useMemo, useState } from 'react';
import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { formatDate, shareRequests, type DemoShareRequest } from '@/lib/demo-data';
import { SharesViewProps } from './types';

export function SharesView({ variant = 'internal' }: SharesViewProps) {
  const initial = useMemo(
    () => shareRequests.filter((s) => s.pathType === variant),
    [variant]
  );
  const [requests, setRequests] = useState<DemoShareRequest[]>(initial);
  const [selectedId, setSelectedId] = useState<string | null>(
    initial.find((s) => s.status === 'pending')?.id ?? null
  );

  const selected = requests.find((r) => r.id === selectedId);
  const isThirdParty = variant === 'thirdParty';

  function decide(id: string, action: 'approved' | 'denied') {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
  }

  return (
    <div>
      <PageHeader
        brandStamp
        title={isThirdParty ? 'Third-party shares' : 'Internal share workflow'}
        subtitle={
          isThirdParty
            ? 'Consent and minimisation path — PSD2/GDPR tension explicit. Full internal federation graph never shown.'
            : 'Cross-LOB share with purpose, retention, approve/deny — no silent bilateral extracts.'
        }
      />

      {isThirdParty && (
        <Panel title="Trust boundary" className="mb-4">
          <p className="text-sm text-graphite-400">
            Third-party paths require explicit consent basis and field minimisation. TPPs receive
            scoped product slices only — never the full internal lineage graph or federation map.
          </p>
        </Panel>
      )}

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="Request queue" className="lg:col-span-2">
          <ul className="space-y-2">
            {requests.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(r.id)}
                  className={`w-full border px-3 py-2 text-left text-sm transition-colors ${
                    selectedId === r.id
                      ? 'border-signal bg-signal/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{r.dataProductName}</span>
                    <StatusChip status={r.status} />
                  </div>
                  <p className="mt-1 truncate text-xs text-graphite-400">{r.requester}</p>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Decision pane" className="lg:col-span-3">
          {selected ? (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <div>
                  <p className="text-xs uppercase text-graphite-400">Requester</p>
                  <p>{selected.requester}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-graphite-400">Product</p>
                  <p className="font-mono text-xs">{selected.dataProductName}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase text-graphite-400">Purpose</p>
                  <p>{selected.purpose}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-graphite-400">Retention</p>
                  <p>{selected.retentionDays} days</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-graphite-400">Requested</p>
                  <p>{formatDate(selected.requestedAt)}</p>
                </div>
                {isThirdParty && selected.tppIdentity && (
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase text-graphite-400">TPP identity</p>
                    <p>{selected.tppIdentity}</p>
                  </div>
                )}
                {isThirdParty && selected.consentBasis && (
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase text-graphite-400">Consent basis</p>
                    <p>{selected.consentBasis}</p>
                  </div>
                )}
              </div>

              {isThirdParty && (
                <div className="border border-yard-hold/30 bg-yard-hold/5 p-3 text-sm">
                  <p className="font-medium text-yard-hold">Minimisation preview</p>
                  <p className="mt-1 text-graphite-400 text-xs font-mono">
                    Fields: account_id (hashed), product_type, aggregated_balance_band — full
                    customer graph excluded
                  </p>
                </div>
              )}

              {selected.status === 'pending' ? (
                <div className="flex gap-3 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => decide(selected.id, 'approved')}
                    className="bg-yard-clear/20 border border-yard-clear/40 px-4 py-2 text-sm font-medium text-yard-clear hover:bg-yard-clear/30"
                  >
                    Approve grant
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(selected.id, 'denied')}
                    className="border border-yard-slip/40 px-4 py-2 text-sm text-yard-slip hover:bg-yard-slip/10"
                  >
                    Deny with rationale
                  </button>
                </div>
              ) : (
                <p className="text-sm text-graphite-400 border-t border-white/10 pt-4">
                  Decision recorded: <StatusChip status={selected.status} />
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-graphite-400">Select a share request.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}
