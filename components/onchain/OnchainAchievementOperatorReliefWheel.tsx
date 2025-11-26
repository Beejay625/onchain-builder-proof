'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementOperatorReliefWheel(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Operator Relief Wheel"
      subtitle="Rotate tired humans"
      accent="emerald"
      ctaLabel="Schedule Relief"
      payloadPrefix="RELIEF_WHEEL"
      fields={[
        {
          key: 'operator',
          label: 'Operator',
          type: 'text',
          placeholder: 'guardian.ops',
          required: true,
        },
        {
          key: 'start',
          label: 'Start Time',
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
          key: 'reliefContact',
          label: 'Relief Contact',
          type: 'text',
          placeholder: 'guardian.backup',
          required: true,
        },
      ]}
    />
  )
}
