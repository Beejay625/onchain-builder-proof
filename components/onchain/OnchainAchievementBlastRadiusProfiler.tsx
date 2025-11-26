'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBlastRadiusProfiler(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Blast Radius Profiler"
      subtitle="Quantify incident impact in one payload"
      accent="amber"
      ctaLabel="Publish Blast Radius"
      payloadPrefix="BLAST_RADIUS"
      fields=[
      {
              key: 'services',
              label: 'Impacted Services',
              type: 'textarea',
              placeholder: 'API, treasury bot, etc.',
              required: true,
            },
      {
              key: 'userCount',
              label: 'Users Impacted',
              type: 'number',
              placeholder: '0',
              required: true,
            },
      {
              key: 'lossEstimate',
              label: 'Loss Estimate',
              type: 'text',
              placeholder: 'e.g. 25k USD',
              required: true,
            },
      {
              key: 'confidence',
              label: 'Confidence',
              type: 'select',
              options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
              required: true,
            },
    ]
    />
  )
}
