'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarTelemetryHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Telemetry Hub"
      subtitle="Telemetry hub for stellar network operations"
      accent="cyan"
      ctaLabel="Deploy Hub"
      payloadPrefix="STELLAR_TELEMETRY"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'telemetryTypes',
          label: 'Telemetry Types',
          type: 'textarea',
          placeholder: 'latency,throughput,error_rate,health',
          required: true,
        },
        {
          key: 'aggregationInterval',
          label: 'Aggregation Interval (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'hubPolicy',
          label: 'Hub Policy',
          type: 'textarea',
          placeholder: 'Telemetry hub rules and aggregation parameters',
        },
      ]}
    />
  )
}

