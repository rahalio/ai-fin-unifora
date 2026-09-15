'use client';

import { FormEvent, useState } from 'react';
import { EmptyState, PageHeader, Panel } from '@/components/ui';

export function AuditsView() {
  const [scope, setScope] = useState('access-shares-pipelines');
  const [from, setFrom] = useState('2026-01-01');
  const [to, setTo] = useState('2026-09-15');
  const [generated, setGenerated] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const id = `pack-${Date.now().toString(36)}`;
    setRequestId(id);
    setGenerated(true);
  }

  return (
    <div>
      <PageHeader
        title="Examiner audit export"
        subtitle="Dataset access, sharing decisions, and pipeline changes in one examiner pack."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Scope builder">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase text-graphite-400">Pack scope</label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="mt-1 w-full border border-white/10 bg-graphite-900 px-3 py-2 text-sm"
              >
                <option value="access-shares-pipelines">Access + shares + pipeline changes</option>
                <option value="shares-only">Share decisions only</option>
                <option value="lineage-slice">Lineage slice (KYC golden)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase text-graphite-400">From</label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-1 w-full border border-white/10 bg-graphite-900 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-graphite-400">To</label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-1 w-full border border-white/10 bg-graphite-900 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-signal px-4 py-2 text-sm font-semibold text-white hover:bg-signal-soft"
            >
              Generate examiner pack
            </button>
          </form>
        </Panel>

        <Panel title="Pack preview">
          {generated && requestId ? (
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-xs uppercase text-graphite-400">Request ID: </span>
                <span className="font-mono">{requestId}</span>
              </p>
              <p className="text-graphite-400">
                Partial pack warning: lineage coverage 94% on KYC golden — remaining gaps flagged
                in appendix.
              </p>
              <button
                type="button"
                className="border border-yard-clear/40 px-4 py-2 text-yard-clear hover:bg-yard-clear/10"
              >
                Download pack (.zip)
              </button>
            </div>
          ) : (
            <EmptyState
              title="No pack generated"
              body="Configure scope and date range, then generate an examiner-ready export."
            />
          )}
        </Panel>
      </div>
    </div>
  );
}
