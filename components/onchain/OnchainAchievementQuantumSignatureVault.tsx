'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSignatureVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Signature Vault"
      subtitle="Vault for quantum-resistant signatures"
      accent="purple"
      ctaLabel="Create Vault"
      payloadPrefix="QSIG_VAULT"
      fields={[
        {
          key: 'vaultId',
          label: 'Vault Identifier',
          type: 'text',
          placeholder: 'vault-001',
          required: true,
        },
        {
          key: 'signatureAlgorithm',
          label: 'Signature Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'vaultType',
          label: 'Vault Type',
          type: 'select',
          options: [
            { label: 'Hot', value: 'hot' },
            { label: 'Warm', value: 'warm' },
            { label: 'Cold', value: 'cold' },
          ],
          required: true,
        },
        {
          key: 'signatureCount',
          label: 'Signature Count',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'rotationPolicy',
          label: 'Rotation Policy',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Usage-Based', value: 'usage_based' },
            { label: 'Manual', value: 'manual' },
          ],
          required: true,
        },
      ]}
    />
  )
}

