'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumNexusNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Nexus Network"
      subtitle="Network infrastructure for quantum nexus operations"
      accent="purple"
      ctaLabel="Join Network"
      payloadPrefix="QNEXUS_NET"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'networkType',
          label: 'Network Type',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
            { label: 'Consortium', value: 'consortium' },
          ],
          required: true,
        },
        {
          key: 'participantCount',
          label: 'Participant Count',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'quantumAlgorithms',
          label: 'Supported Quantum Algorithms',
          type: 'textarea',
          placeholder: 'kyber,dilithium,falcon,sphincs',
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Network rules and participation requirements',
        },
      ]}
    />
  )
}

