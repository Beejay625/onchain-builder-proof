'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResistantVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resistant Vault"
      subtitle="Secure vaults with post-quantum cryptography"
      accent="indigo"
      ctaLabel="Create Vault"
      payloadPrefix="QRESISTANT_VAULT"
      fields={[
        {
          key: 'vaultId',
          label: 'Vault Identifier',
          type: 'text',
          placeholder: 'vault-001',
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
          key: 'accessControlPolicy',
          label: 'Access Control Policy',
          type: 'textarea',
          placeholder: 'Access control rules and permissions',
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
          key: 'vaultPolicy',
          label: 'Vault Policy',
          type: 'textarea',
          placeholder: 'Vault security rules and encryption parameters',
        },
      ]}
    />
  )
}

