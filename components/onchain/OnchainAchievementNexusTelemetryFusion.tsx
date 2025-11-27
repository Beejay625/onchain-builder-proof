'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusTelemetryFusion(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Telemetry Fusion"
      subtitle="Fuse telemetry across nexus networks"
      accent="cyan"
      ctaLabel="Configure Fusion"
      payloadPrefix="NEXUS_TELEMETRY_FUSION"
      fields={[
        {
          key: 'fusionId',
          label: 'Fusion Identifier',
          type: 'text',
          placeholder: 'fusion-001',
          required: true,
        },
        {
          key: 'sourceNexuses',
          label: 'Source Nexus Networks',
          type: 'textarea',
          placeholder: 'nexus1,nexus2,nexus3',
          required: true,
        },
        {
          key: 'telemetryTypes',
          label: 'Telemetry Types',
          type: 'textarea',
          placeholder: 'latency,throughput,error_rate,sovereignty_metrics',
          required: true,
        },
        {
          key: 'fusionMethod',
          label: 'Fusion Method',
          type: 'select',
          options: [
            { label: 'Aggregation', value: 'aggregation' },
            { label: 'Correlation', value: 'correlation' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'fusionWindow',
          label: 'Fusion Window (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'fusionPolicy',
          label: 'Fusion Policy',
          type: 'textarea',
          placeholder: 'Telemetry fusion rules and sovereignty considerations',
        },
      ]}
    />
  )
}

