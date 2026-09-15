'use client';

import { PageHeader, Panel, StatusChip } from '@/components/ui';
import { formatDate, platformAttestation } from '@/lib/demo-data';

export function SecurityAttestationsView() {
  const att = platformAttestation;

  return (
    <div>
      <PageHeader
        title="Platform security attestation"
        subtitle="Analytics platform resiliency attested; cloud use shows institution owns data protection."
      />

      <Panel title="Cloud ownership">
        <p className="text-sm text-graphite-200">{att.cloudOwnershipStatement}</p>
        <p className="mt-3 text-xs text-graphite-400">
          Last attested {formatDate(att.lastAttestedAt)} by {att.attestedBy}
        </p>
      </Panel>

      <Panel title="Control checklist" className="mt-4">
        <ul className="divide-y divide-white/10">
          {att.controls.map((c) => (
            <li key={c.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p>{c.label}</p>
                {c.evidence && (
                  <p className="text-xs text-graphite-400">Evidence: {c.evidence}</p>
                )}
              </div>
              <StatusChip status={c.status} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
