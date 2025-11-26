'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAutonomousRecoveryMesh(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Autonomous Recovery Mesh"
      subtitle="Mesh autonomous recovery agents across domains"
      accent="cyan"
      ctaLabel="Deploy Recovery Mesh"
      payloadPrefix="RECOVERY_MESH"
      fields={[
        {
          key: 'meshId',
          label: 'Mesh Identifier',
          type: 'text',
          placeholder: 'recovery-mesh-001',
          required: true,
        },
        {
          key: 'agentCount',
          label: 'Agent Count',
          type: 'number',
          placeholder: '5',
          required: true,
        },
        {
          key: 'recoveryStrategy',
          label: 'Recovery Strategy',
          type: 'select',
          options: [
            { label: 'Cascading', value: 'cascading' },
            { label: 'Parallel', value: 'parallel' },
            { label: 'Sequential', value: 'sequential' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'healthCheckInterval',
          label: 'Health Check Interval (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'fallbackPolicy',
          label: 'Fallback Policy',
          type: 'textarea',
          placeholder: 'Escalation rules and thresholds',
        },
      ]}
    />
  )
}

