'use client';

import { PageHeader, Panel } from '@/components/ui';
import { ROLE_LABELS, getStoredRole } from '@/lib/roles';
import { useEffect, useState } from 'react';

export function IdentityView() {
  const [email, setEmail] = useState('operator@institution.local');
  const [role, setRole] = useState('cdo');

  useEffect(() => {
    setRole(getStoredRole());
    const token = localStorage.getItem('unifora.token');
    if (token) setEmail('admin@demo.local');
  }, []);

  return (
    <div>
      <PageHeader title="Operator profile" subtitle="Identity stub — API-backed profile coming soon." />

      <Panel title="Session">
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase text-graphite-400">Email</dt>
            <dd className="font-mono">{email}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-graphite-400">Active role</dt>
            <dd>{ROLE_LABELS[role as keyof typeof ROLE_LABELS] ?? role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-graphite-400">Tenant</dt>
            <dd>Institution sandbox</dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
