'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResistantEscrow(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resistant Escrow"
      subtitle="Escrow contracts with post-quantum security"
      accent="blue"
      ctaLabel="Create Escrow"
      payloadPrefix="QRESISTANT_ESCROW"
      fields={[
        {
          key: 'escrowId',
          label: 'Escrow Identifier',
          type: 'text',
          placeholder: 'escrow-001',
          required: true,
        },
        {
          key: 'encryptionAlgorithm',
          label: 'Encryption Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'NTRU', value: 'ntru' },
            { label: 'McEliece', value: 'mceliece' },
          ],
          required: true,
        },
        {
          key: 'conditionalRelease',
          label: 'Conditional Release',
          type: 'textarea',
          placeholder: 'Release conditions and triggers',
        },
        {
          key: 'escrowPolicy',
          label: 'Escrow Policy',
          type: 'textarea',
          placeholder: 'Escrow rules and release parameters',
        },
      ]}
    />
  )
}

