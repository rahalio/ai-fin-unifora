'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

const toneStyles = {
  signal: 'text-signal',
  clear: 'text-yard-clear',
  slip: 'text-yard-slip',
  hold: 'text-yard-hold',
  mute: 'text-graphite-400',
} as const;

export function Panel({
  title,
  children,
  action,
  className,
}: {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        'border border-white/10 bg-graphite-800/80 rounded-sm',
        className
      )}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          {title && (
            <h2 className="text-sm font-semibold uppercase tracking-wide text-graphite-200">
              {title}
            </h2>
          )}
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  tone = 'mute',
  sub,
}: {
  label: string;
  value: ReactNode;
  tone?: keyof typeof toneStyles;
  sub?: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-graphite-400">{label}</p>
      <p className={clsx('font-display text-2xl tabular-nums', toneStyles[tone])}>
        {value}
      </p>
      {sub && <p className="text-xs text-graphite-400">{sub}</p>}
    </div>
  );
}

export function Gauge({
  label,
  value,
  target = 0.2,
  baseline = 0.8,
}: {
  label: string;
  value: number;
  target?: number;
  baseline?: number;
}) {
  const pct = Math.round(value * 100);
  const targetPct = Math.round(target * 100);
  const baselinePct = Math.round(baseline * 100);
  const tone =
    value <= target ? 'bg-yard-clear' : value <= baseline * 0.75 ? 'bg-signal' : 'bg-yard-slip';

  return (
    <div className="space-y-2" aria-label={`${label}: ${pct}%`}>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-graphite-400">{label}</p>
        <p className="font-mono text-lg tabular-nums text-ink">{pct}%</p>
      </div>
      <div className="relative h-3 border border-white/10 bg-graphite-900">
        <div
          className={clsx('h-full transition-all duration-200 ease-out', tone)}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
        <div
          className="absolute top-0 h-full w-px bg-yard-clear/80"
          style={{ left: `${targetPct}%` }}
          title={`Target ${targetPct}%`}
        />
        <div
          className="absolute top-0 h-full w-px border-l border-dashed border-graphite-400/60"
          style={{ left: `${baselinePct}%` }}
          title={`Baseline ~${baselinePct}%`}
        />
      </div>
      <div className="flex justify-between text-[10px] text-graphite-400 font-mono">
        <span>Target {targetPct}%</span>
        <span>Baseline ~{baselinePct}%</span>
      </div>
    </div>
  );
}

export function StatusChip({ status }: { status: string }) {
  const normalized = status.toLowerCase().replace(/[_\s]+/g, '-');
  const styles: Record<string, string> = {
    green: 'border-yard-clear/40 text-yard-clear bg-yard-clear/10',
    amber: 'border-yard-hold/40 text-yard-hold bg-yard-hold/10',
    red: 'border-yard-slip/40 text-yard-slip bg-yard-slip/10',
    healthy: 'border-yard-clear/40 text-yard-clear bg-yard-clear/10',
    warning: 'border-yard-hold/40 text-yard-hold bg-yard-hold/10',
    breach: 'border-yard-slip/40 text-yard-slip bg-yard-slip/10',
    pending: 'border-signal/40 text-signal bg-signal/10',
    approved: 'border-yard-clear/40 text-yard-clear bg-yard-clear/10',
    denied: 'border-yard-slip/40 text-yard-slip bg-yard-slip/10',
    escalated: 'border-signal/40 text-signal bg-signal/10',
    open: 'border-signal/40 text-signal bg-signal/10',
    overdue: 'border-yard-slip/40 text-yard-slip bg-yard-slip/10 animate-pulse',
    ruled: 'border-yard-hold/40 text-yard-hold bg-yard-hold/10',
    closed: 'border-graphite-600 text-graphite-400 bg-graphite-700/50',
    'in-progress': 'border-signal/40 text-signal bg-signal/10',
    in_progress: 'border-signal/40 text-signal bg-signal/10',
    blocked: 'border-yard-slip/40 text-yard-slip bg-yard-slip/10',
    complete: 'border-yard-clear/40 text-yard-clear bg-yard-clear/10',
    draft: 'border-graphite-600 text-graphite-400 bg-graphite-700/50',
    pass: 'border-yard-clear/40 text-yard-clear bg-yard-clear/10',
    gap: 'border-yard-slip/40 text-yard-slip bg-yard-slip/10',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium uppercase tracking-wide',
        styles[normalized] ?? 'border-white/10 text-graphite-200 bg-graphite-700/50'
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-white/10 bg-graphite-900/50 px-6 py-10 text-center">
      <p className="font-display text-lg text-graphite-200">{title}</p>
      <p className="mt-2 text-sm text-graphite-400 max-w-md mx-auto">{body}</p>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  brandStamp,
  action,
}: {
  title: string;
  subtitle?: string;
  brandStamp?: boolean;
  action?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {brandStamp && (
          <p className="font-display text-signal text-sm tracking-wide mb-1">Unifora</p>
        )}
        <h1 className="font-display text-2xl sm:text-3xl text-ink tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-graphite-400">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
