'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumThreatMonitor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Threat Monitor"
      subtitle="Monitor for quantum computing threats"
      accent="red"
      ctaLabel="Deploy Monitor"
      payloadPrefix="QTHREAT_MONITOR"
      fields={[
        {
          key: 'monitorId',
          label: 'Monitor Identifier',
          type: 'text',
          placeholder: 'monitor-001',
          required: true,
        },
        {
          key: 'threatLevel',
          label: 'Threat Level',
          type: 'select',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
            { label: 'Critical', value: 'critical' },
          ],
          required: true,
        },
        {
          key: 'mitigationTracking',
          label: 'Mitigation Tracking',
          type: 'textarea',
          placeholder: 'Mitigation strategies and tracking',
        },
        {
          key: 'monitorPolicy',
          label: 'Monitor Policy',
          type: 'textarea',
          placeholder: 'Threat monitoring rules and alert parameters',
        },
      ]}
    />
  )
}

