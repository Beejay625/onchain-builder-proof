'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementOperatorReliefRotation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Operator Relief Rotation"
      subtitle="Rotate tired humans on-chain"
      accent="emerald"
      ctaLabel="Schedule Relief"
      payloadPrefix="RELIEF_ROTATION"
      fields=[
      {
              key: 'operator',
              label: 'Operator',
              type: 'text',
              placeholder: 'guardian.ops',
              required: true,
            },
      {
              key: 'reliefStart',
              label: 'Relief Start',
              type: 'text',
              placeholder: '2025-01-12T12:00Z',
              required: true,
            },
      {
              key: 'durationMinutes',
              label: 'Duration (minutes)',
              type: 'number',
              placeholder: '60',
              required: true,
            },
      {
              key: 'fatigueScore',
              label: 'Fatigue Score',
              type: 'number',
              placeholder: '7',
              required: true,
            },
      {
              key: 'replacement',
              label: 'Replacement',
              type: 'text',
              placeholder: 'guardian.backup',
              required: true,
            },
    ]
    />
  )
}
