'use client';

import { PageHeader, Panel, Stat } from '@/components/ui';
import { readinessScores, useCases } from '@/lib/demo-data';

export function ReadinessView() {
  return (
    <div>
      <PageHeader
        brandStamp
        title="Finextra readiness score"
        subtitle="Silo removal, analytics platform for risk governance, and operationalised pipelines before model sprint."
      />

      <div className="space-y-4">
        {useCases.map((uc) => {
          const score = readinessScores[uc.id];
          if (!score) return null;
          const tone = score.overall >= 80 ? 'clear' : score.overall >= 60 ? 'hold' : 'slip';
          return (
            <Panel key={uc.id} title={uc.name}>
              <div className="grid gap-6 sm:grid-cols-4">
                <Stat label="Overall score" value={score.overall} tone={tone} sub="/ 100" />
                <Stat label="Silo removal" value={score.siloRemoval} tone="mute" sub="/ 100" />
                <Stat
                  label="Analytics platform"
                  value={score.analyticsPlatform}
                  tone="mute"
                  sub="/ 100"
                />
                <Stat
                  label="Operationalised pipelines"
                  value={score.operationalisedPipelines}
                  tone="mute"
                  sub="/ 100"
                />
              </div>
              {score.blockingGaps.length > 0 ? (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-wide text-graphite-400">
                    Blocking gaps
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-yard-hold">
                    {score.blockingGaps.map((g) => (
                      <li key={g}>• {g}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-sm text-yard-clear">Model sprint badge eligible.</p>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
