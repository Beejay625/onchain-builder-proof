'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveMonitoringSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Monitoring System"
      subtitle="Monitoring system with adaptive thresholds"
      accent="cyan"
      ctaLabel="Deploy System"
      payloadPrefix="ADAPTIVE_MONITORING"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'monitoredMetrics',
          label: 'Monitored Metrics',
          type: 'textarea',
          placeholder: 'latency,throughput,error_rate',
          required: true,
        },
        {
          key: 'thresholdMode',
          label: 'Threshold Mode',
          type: 'select',
          options: [
            { label: 'Static', value: 'static' },
            { label: 'Dynamic', value: 'dynamic' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'alertStrategy',
          label: 'Alert Strategy',
          type: 'select',
          options: [
            { label: 'Immediate', value: 'immediate' },
            { label: 'Aggregated', value: 'aggregated' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'Monitoring rules and threshold parameters',
        },
      ]}
    />
  )
}

