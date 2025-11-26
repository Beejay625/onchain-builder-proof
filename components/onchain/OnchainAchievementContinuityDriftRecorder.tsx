'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementContinuityDriftRecorder(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Continuity Drift Recorder"
      subtitle="Track drift vs baselines"
      accent="emerald"
      ctaLabel="Log Drift Reading"
      payloadPrefix="DRIFT_RECORDER"
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
        label: 'Observed Value',
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
        {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Mitigation or reviewer',
        },
      ]}
    />
  )
}
