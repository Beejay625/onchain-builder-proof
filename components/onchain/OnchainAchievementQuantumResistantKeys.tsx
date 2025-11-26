'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResistantKeys(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resistant Keys"
      subtitle="Manage quantum-resistant cryptographic keys"
      accent="purple"
      ctaLabel="Generate Keys"
      payloadPrefix="QUANTUM_KEYS"
      fields={[
        {
          key: 'keyId',
          label: 'Key Identifier',
          type: 'text',
          placeholder: 'key-001',
          required: true,
        },
        {
          key: 'algorithm',
          label: 'Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'keyPurpose',
          label: 'Key Purpose',
          type: 'select',
          options: [
            { label: 'Encryption', value: 'encryption' },
            { label: 'Signing', value: 'signing' },
            { label: 'Both', value: 'both' },
          ],
          required: true,
        },
        {
          key: 'publicKeyHash',
          label: 'Public Key Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'rotationPolicy',
          label: 'Rotation Policy',
          type: 'select',
          options: [
            { label: 'Manual', value: 'manual' },
            { label: 'Time-based', value: 'time_based' },
            { label: 'Event-based', value: 'event_based' },
          ],
          required: true,
        },
        {
          key: 'expiryTimestamp',
          label: 'Expiry Timestamp',
          type: 'number',
          placeholder: '1735689600',
        },
      ]}
    />
  )
}

