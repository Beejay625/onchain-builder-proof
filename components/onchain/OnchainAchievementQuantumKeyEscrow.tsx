'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumKeyEscrow(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Key Escrow"
      subtitle="Escrow keys with post-quantum encryption"
      accent="purple"
      ctaLabel="Create Escrow"
      payloadPrefix="QKEY_ESCROW"
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
          key: 'releaseConditions',
          label: 'Release Conditions',
          type: 'textarea',
          placeholder: 'Conditions for key release',
          required: true,
        },
        {
          key: 'escrowDuration',
          label: 'Escrow Duration (days)',
          type: 'number',
          placeholder: '365',
          required: true,
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

