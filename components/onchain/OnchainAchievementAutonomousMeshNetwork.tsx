'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAutonomousMeshNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Autonomous Mesh Network"
      subtitle="Deploy autonomous mesh network for distributed operations"
      accent="cyan"
      ctaLabel="Deploy Network"
      payloadPrefix="AUTO_MESH"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'mesh-net-001',
          required: true,
        },
        {
          key: 'nodeCount',
          label: 'Initial Node Count',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'autonomyLevel',
          label: 'Autonomy Level',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Semi', value: 'semi' },
            { label: 'Supervised', value: 'supervised' },
          ],
          required: true,
        },
        {
          key: 'consensusMechanism',
          label: 'Consensus Mechanism',
          type: 'select',
          options: [
            { label: 'PBFT', value: 'pbft' },
            { label: 'Raft', value: 'raft' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Network rules and governance policies',
        },
      ]}
    />
  )
}

