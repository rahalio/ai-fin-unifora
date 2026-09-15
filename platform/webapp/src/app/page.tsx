'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gauge, Panel, Stat } from '@/components/ui';
import {
  escalations,
  pipelines,
  programmePulse,
  shareRequests,
  useCases,
} from '@/lib/demo-data';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: 'easeOut' },
};

export default function ControlTowerPage() {
  const missedTtv = useCases.filter((u) => u.ttvHit === false);
  const openShares = shareRequests.filter((s) => s.status === 'pending');
  const breaches = pipelines.filter((p) => p.slaStatus === 'breach');
  const overdue = escalations.filter((e) => e.status === 'overdue');

  return (
    <div className="space-y-8">
      <motion.header {...fade}>
        <p className="font-display text-5xl sm:text-6xl text-signal tracking-tight">Unifora</p>
        <p className="mt-2 text-lg text-graphite-200">
          Cut the 80% data tax; hit quarter TTV
        </p>
        <p className="mt-1 text-sm text-graphite-400 font-mono">
          Programme control tower — Finextra readiness ops
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid gap-4 lg:grid-cols-3"
      >
        <Panel title="Wrangling tax" className="lg:col-span-2">
          <Gauge
            label="Median prep-time share across active use cases"
            value={programmePulse.wranglingTaxMedian}
            target={0.2}
            baseline={0.8}
          />
          <p className="mt-4 text-xs text-graphite-400">
            Target: drive share down from ~80% baseline toward governed reuse.
          </p>
        </Panel>

        <Panel title="TTV performance">
          <div className="grid grid-cols-2 gap-4">
            <Stat
              label="Hit rate"
              value={`${Math.round(programmePulse.ttvHitRate * 100)}%`}
              tone="clear"
            />
            <Stat
              label="Missed gates"
              value={programmePulse.missedTtvCount}
              tone={programmePulse.missedTtvCount > 0 ? 'slip' : 'clear'}
            />
          </div>
          <div
            className="mt-4 border-t border-white/10 pt-3"
            role="status"
            aria-live="polite"
          >
            {missedTtv.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {missedTtv.map((u) => (
                  <li key={u.id}>
                    <Link href="/use-cases" className="text-yard-slip hover:underline">
                      {u.name}
                    </Link>
                    <span className="text-graphite-400"> — quarter gate missed</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-graphite-400">No TTV misses this quarter.</p>
            )}
          </div>
        </Panel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Panel title="Readiness">
          <ul className="space-y-2 text-sm">
            {programmePulse.readinessDistribution.map((b) => (
              <li key={b.label} className="flex justify-between">
                <span className="text-graphite-400">{b.label}</span>
                <span className="font-mono">{b.count}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/readiness"
            className="mt-3 inline-block text-xs text-signal hover:underline"
          >
            Open readiness checklist →
          </Link>
        </Panel>

        <Panel title="Open shares">
          <Stat
            label="Pending decisions"
            value={programmePulse.openShareCount}
            tone={programmePulse.openShareCount > 0 ? 'hold' : 'clear'}
          />
          <ul className="mt-3 space-y-1 text-xs text-graphite-400">
            {openShares.slice(0, 2).map((s) => (
              <li key={s.id} className="truncate">
                {s.dataProductName}
              </li>
            ))}
          </ul>
          <Link href="/shares" className="mt-3 inline-block text-xs text-signal hover:underline">
            Steward queue →
          </Link>
        </Panel>

        <Panel title="Pipeline SLA">
          <Stat
            label="Active breaches"
            value={programmePulse.pipelineBreachCount}
            tone={programmePulse.pipelineBreachCount > 0 ? 'slip' : 'clear'}
          />
          {breaches[0] && (
            <p className="mt-2 text-xs text-graphite-400 truncate">{breaches[0].name}</p>
          )}
          <Link href="/pipelines" className="mt-3 inline-block text-xs text-signal hover:underline">
            Pipeline registry →
          </Link>
        </Panel>

        <Panel title="Escalations">
          <Stat
            label="Overdue cases"
            value={programmePulse.escalationOverdueCount}
            tone={programmePulse.escalationOverdueCount > 0 ? 'slip' : 'clear'}
          />
          {overdue[0] && (
            <p className="mt-2 text-xs text-yard-slip truncate" role="alert">
              {overdue[0].title}
            </p>
          )}
          <Link
            href="/escalations"
            className="mt-3 inline-block text-xs text-signal hover:underline"
          >
            Executive forum →
          </Link>
        </Panel>
      </motion.div>
    </div>
  );
}
