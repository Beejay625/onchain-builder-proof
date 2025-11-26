'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementContinuityDriftScope(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Continuity Drift Scope"
      subtitle="Track continuity drift"
      accent="emerald"
      ctaLabel="Log Drift Scope"
      payloadPrefix="DRIFT_SCOPE"
      fields={[
        {
          key: 'metric',
          label: 'Metric',
          type: 'text',
          placeholder: 'latency_p95',
          required: true,
        },
        {
          key: 'observed',
          label: 'Observed',
          type: 'number',
          placeholder: '325',
          required: true,
        },
        {
          key: 'baseline',
          label: 'Baseline',
          type: 'number',
          placeholder: '180',
          required: true,
        },
        {
          key: 'tolerance',
          label: 'Tolerance',
          type: 'number',
          placeholder: '50',
          required: true,
        },
      ]}
    />
  )
}
