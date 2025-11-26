'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementHotPatchCourier(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Hot Patch Courier"
      subtitle="Track emergency patch drops"
      accent="fuchsia"
      ctaLabel="Send Patch Record"
      payloadPrefix="PATCH_COURIER"
      fields=[
      {
              key: 'artifactHash',
              label: 'Artifact Hash',
              type: 'text',
              placeholder: '0xpatch',
              required: true,
            },
      {
              key: 'environment',
              label: 'Environment',
              type: 'select',
              options: [
          { label: 'Staging', value: 'staging' },
          { label: 'Canary', value: 'canary' },
          { label: 'Production', value: 'production' },
        ],
              required: true,
            },
      {
              key: 'risk',
              label: 'Risk Class',
              type: 'select',
              options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
              required: true,
            },
      {
              key: 'summary',
              label: 'Summary',
              type: 'textarea',
              placeholder: 'What changed and why',
              required: true,
            },
    ]
    />
  )
}
