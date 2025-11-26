'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAutothrottleGuardian(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Autothrottle Guardian"
      subtitle="Enforce throttles with receipts"
      accent="amber"
      ctaLabel="Set Autothrottle"
      payloadPrefix="AUTOTHROTTLE_GUARDIAN"
      fields={[
        {
          key: 'target',
          label: 'Target',
          type: 'text',
          placeholder: 'mint-automation',
          required: true,
        },
        {
          key: 'maxThroughput',
          label: 'Max Throughput',
          type: 'number',
          placeholder: '25',
          required: true,
        },
        {
          key: 'mode',
          label: 'Mode',
          type: 'select',
          options: [
            { label: 'Pause', value: 'pause' },
            { label: 'Slow', value: 'slow' },
            { label: 'Resume', value: 'resume' },
          ],
          required: true,
        },
        {
          key: 'rationale',
          label: 'Rationale',
          type: 'textarea',
          placeholder: 'Why throttling is needed',
          required: true,
        },
      ]}
    />
  )
}
