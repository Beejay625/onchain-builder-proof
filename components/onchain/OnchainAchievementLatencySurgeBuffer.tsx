'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementLatencySurgeBuffer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Latency Surge Buffer"
      subtitle="Codify throttling actions"
      accent="blue"
      ctaLabel="Apply Surge Buffer"
      payloadPrefix="LATENCY_SURGE"
      fields=[
      {
              key: 'endpoint',
              label: 'Endpoint',
              type: 'text',
              placeholder: '/api/v1/proofs',
              required: true,
            },
      {
              key: 'threshold',
              label: 'Threshold (ms)',
              type: 'number',
              placeholder: '450',
              required: true,
            },
      {
              key: 'action',
              label: 'Buffer Action',
              type: 'select',
              options: [
          { label: 'Throttle', value: 'throttle' },
          { label: 'Batch', value: 'batch' },
          { label: 'Queue', value: 'queue' },
        ],
              required: true,
            },
      {
              key: 'notes',
              label: 'Notes',
              type: 'textarea',
              placeholder: 'What gets throttled and why',
              required: true,
            },
    ]
    />
  )
}
