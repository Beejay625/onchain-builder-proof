'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTelemetryDampeningShield(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Telemetry Dampening Shield"
      subtitle="Throttle noisy telemetry safely"
      accent="indigo"
      ctaLabel="Deploy Dampening"
      payloadPrefix="DAMPENING_SHIELD"
      fields={[
        {
        key: 'band',
        label: 'Dampening Band',
        type: 'number',
        placeholder: '15',
        required: true,
        },
        {
        key: 'policyHash',
        label: 'Policy Hash',
        type: 'text',
        placeholder: '0xpolicy',
        required: true,
        },
        {
        key: 'duration',
        label: 'Duration',
        type: 'text',
        placeholder: '15m',
        required: true,
        },
        {
        key: 'justification',
        label: 'Justification',
        type: 'textarea',
        placeholder: 'Why the shield is needed',
        required: true,
        },
      ]}
    />
  )
}
