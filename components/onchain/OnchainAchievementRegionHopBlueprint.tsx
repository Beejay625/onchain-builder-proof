'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRegionHopBlueprint(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Region Hop Blueprint"
      subtitle="Document regional handoffs"
      accent="blue"
      ctaLabel="Publish Hop Blueprint"
      payloadPrefix="REGION_HOP"
      fields={[
        {
          key: 'primary',
          label: 'Primary Region',
          type: 'text',
          placeholder: 'us-east',
          required: true,
        },
        {
          key: 'standby',
          label: 'Standby Region',
          type: 'text',
          placeholder: 'eu-west',
          required: true,
        },
        {
          key: 'validationLink',
          label: 'Validation Checklist URL',
          type: 'text',
          placeholder: 'https://...',
          required: true,
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { label: 'Planned', value: 'planned' },
            { label: 'Ready', value: 'ready' },
            { label: 'Executed', value: 'executed' },
          ],
          required: true,
        },
      ]}
    />
  )
}
