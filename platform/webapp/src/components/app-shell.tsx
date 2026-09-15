'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  ROLE_HOME,
  ROLE_LABELS,
  ROLE_STORAGE_KEY,
  getStoredRole,
  type OperatorRole,
} from '@/lib/roles';

const NAV = [
  { href: '/', label: 'Control tower', exact: true },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/data-products', label: 'Data products' },
  { href: '/readiness', label: 'Readiness' },
  { href: '/shares', label: 'Shares (internal)' },
  { href: '/shares/third-party', label: 'Third-party shares' },
  { href: '/lineage', label: 'Lineage' },
  { href: '/pipelines', label: 'Pipelines' },
  { href: '/capacity', label: 'Capacity' },
  { href: '/escalations', label: 'Escalations' },
  { href: '/security', label: 'Security' },
  { href: '/audits', label: 'Audits' },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={clsx(
              'border-l-2 px-3 py-2 text-sm transition-colors',
              active
                ? 'border-signal bg-white/5 text-signal font-medium'
                : 'border-transparent text-graphite-400 hover:border-white/20 hover:text-graphite-200'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [role, setRole] = useState<OperatorRole>('cdo');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setRole(getStoredRole());
  }, []);

  const handleRoleChange = useCallback(
    (next: OperatorRole) => {
      setRole(next);
      localStorage.setItem(ROLE_STORAGE_KEY, next);
      router.push(ROLE_HOME[next]);
    },
    [router]
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile top bar */}
      <header className="lg:hidden border-b border-white/10 bg-graphite-950/90 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="font-display text-xl text-signal tracking-tight">
            Unifora
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="border border-white/10 px-3 py-1.5 text-xs uppercase tracking-wide text-graphite-200"
            aria-expanded={mobileOpen}
          >
            Menu
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 px-2 py-3 max-h-[70vh] overflow-y-auto">
            <NavLinks onNavigate={() => setMobileOpen(false)} />
            <div className="mt-4 px-3">
              <label className="text-[10px] uppercase tracking-wide text-graphite-400">
                Operator role
              </label>
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as OperatorRole)}
                className="mt-1 w-full border border-white/10 bg-graphite-800 px-2 py-2 text-sm text-graphite-200"
              >
                {(Object.keys(ROLE_LABELS) as OperatorRole[]).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Desktop rail */}
      <aside className="hidden lg:flex lg:w-56 xl:w-60 shrink-0 flex-col border-r border-white/10 bg-graphite-950/80">
        <div className="border-b border-white/10 px-4 py-5">
          <Link href="/" className="block font-display text-2xl text-signal tracking-tight">
            Unifora
          </Link>
          <p className="mt-2 text-[11px] leading-snug text-graphite-400">
            Cut the 80% data tax; hit quarter TTV
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          <NavLinks />
        </div>
        <div className="border-t border-white/10 p-4">
          <label className="text-[10px] uppercase tracking-wide text-graphite-400">
            Operator role
          </label>
          <select
            value={role}
            onChange={(e) => handleRoleChange(e.target.value as OperatorRole)}
            className="mt-1 w-full border border-white/10 bg-graphite-800 px-2 py-2 text-sm text-graphite-200"
          >
            {(Object.keys(ROLE_LABELS) as OperatorRole[]).map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
