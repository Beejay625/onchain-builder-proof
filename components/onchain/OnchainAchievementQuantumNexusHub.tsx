'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumNexusHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Nexus Hub"
      subtitle="Central hub for quantum nexus operations"
      accent="purple"
      ctaLabel="Register Hub"
      payloadPrefix="QNEXUS_HUB"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'supportedOperations',
          label: 'Supported Operations',
          type: 'textarea',
          placeholder: 'routing,encryption,signing,verification',
          required: true,
        },
        {
          key: 'quantumAlgorithms',
          label: 'Quantum Algorithms',
          type: 'textarea',
          placeholder: 'kyber,dilithium,falcon,sphincs',
          required: true,
        },
        {
          key: 'hubAddress',
          label: 'Hub Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'coordinationPolicy',
          label: 'Coordination Policy',
          type: 'select',
          options: [
            { label: 'Centralized', value: 'centralized' },
            { label: 'Distributed', value: 'distributed' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'hubMetadata',
          label: 'Hub Metadata',
          type: 'textarea',
          placeholder: 'Hub capabilities and configuration',
        },
      ]}
    />
  )
}

