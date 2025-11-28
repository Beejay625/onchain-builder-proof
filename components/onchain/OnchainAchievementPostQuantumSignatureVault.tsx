'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostQuantumSignatureVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Quantum Signature Vault"
      subtitle="Store signatures using quantum-resistant schemes"
      accent="violet"
      ctaLabel="Create Vault"
      payloadPrefix="PQ_SIG_VAULT"
      fields={[
        {
          key: 'vaultId',
          label: 'Vault Identifier',
          type: 'text',
          placeholder: 'vault-001',
          required: true,
        },
        {
          key: 'signatureScheme',
          label: 'Signature Scheme',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
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
          key: 'expiryTimestamp',
          label: 'Expiry Timestamp',
          type: 'number',
          placeholder: '1735689600',
          required: true,
        },
        {
          key: 'vaultPolicy',
          label: 'Vault Policy',
          type: 'textarea',
          placeholder: 'Signature vault rules and expiry parameters',
        },
      ]}
    />
  )
}

