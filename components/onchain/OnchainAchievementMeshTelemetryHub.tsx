'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshTelemetryHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Telemetry Hub"
      subtitle="Central hub for mesh network telemetry"
      accent="cyan"
      ctaLabel="Deploy Hub"
      payloadPrefix="MESH_TELEMETRY"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'meshNetworks',
          label: 'Connected Mesh Networks',
          type: 'textarea',
          placeholder: 'mesh-001,mesh-002,mesh-003',
          required: true,
        },
        {
          key: 'telemetryTypes',
          label: 'Telemetry Types',
          type: 'textarea',
          placeholder: 'latency,throughput,error_rate,node_health',
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
          key: 'retentionPolicy',
          label: 'Retention Policy',
          type: 'select',
          options: [
            { label: 'Short-term', value: 'short' },
            { label: 'Medium-term', value: 'medium' },
            { label: 'Long-term', value: 'long' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'hubConfig',
          label: 'Hub Configuration',
          type: 'textarea',
          placeholder: 'Hub settings and telemetry processing rules',
        },
      ]}
    />
  )
}

