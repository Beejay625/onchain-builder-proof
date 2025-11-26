'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTelemetryParityLatch(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Telemetry Parity Latch"
      subtitle="Enforce parity across feeds"
      accent="indigo"
      ctaLabel="Set Parity Latch"
      payloadPrefix="PARITY_LATCH"
      fields={[
        {
          key: 'feed',
          label: 'Feed',
          type: 'text',
          placeholder: 'latency p95',
          required: true,
        },
        {
          key: 'expectedValue',
          label: 'Expected Value',
          type: 'number',
          placeholder: '180',
          required: true,
        },
        {
          key: 'observedValue',
          label: 'Observed Value',
          type: 'number',
          placeholder: '240',
          required: true,
        },
        {
          key: 'latchPolicy',
          label: 'Latch Policy',
          type: 'textarea',
          placeholder: 'Action when divergence occurs',
          required: true,
        },
      ]}
    />
  )
}
