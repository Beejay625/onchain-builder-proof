'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumKeyRotationVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Key Rotation Vault"
      subtitle="Manage quantum-resistant key rotation cycles"
      accent="violet"
      ctaLabel="Configure Vault"
      payloadPrefix="QKEY_ROTATION"
      fields={[
        {
          key: 'vaultId',
          label: 'Vault Identifier',
          type: 'text',
          placeholder: 'vault-001',
          required: true,
        },
        {
          key: 'rotationPolicy',
          label: 'Rotation Policy',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Event-Based', value: 'event_based' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'rotationInterval',
          label: 'Rotation Interval (days)',
          type: 'number',
          placeholder: '90',
          required: true,
        },
        {
          key: 'algorithm',
          label: 'Quantum Algorithm',
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
          key: 'keyHistoryLimit',
          label: 'Key History Limit',
          type: 'number',
          placeholder: '10',
          required: true,
        },
      ]}
    />
  )
}

