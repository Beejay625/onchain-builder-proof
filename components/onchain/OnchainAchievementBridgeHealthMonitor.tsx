'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeHealthMonitor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Health Monitor"
      subtitle="Monitors bridge health across chains"
      accent="emerald"
      ctaLabel="Deploy Monitor"
      payloadPrefix="BRIDGE_HEALTH_MON"
      fields={[
        {
          key: 'monitorId',
          label: 'Monitor Identifier',
          type: 'text',
          placeholder: 'monitor-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'healthMetrics',
          label: 'Health Metrics',
          type: 'textarea',
          placeholder: 'latency,throughput,error_rate,availability',
          required: true,
        },
        {
          key: 'checkInterval',
          label: 'Check Interval (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'alertThresholds',
          label: 'Alert Thresholds',
          type: 'textarea',
          placeholder: 'Threshold values and alert rules',
        },
      ]}
    />
  )
}

