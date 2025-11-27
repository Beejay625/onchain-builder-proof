'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResistantIdentity(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resistant Identity"
      subtitle="Identity system with quantum-resistant cryptography"
      accent="purple"
      ctaLabel="Create Identity"
      payloadPrefix="QIDENTITY"
      fields={[
        {
          key: 'identityId',
          label: 'Identity Identifier',
          type: 'text',
          placeholder: 'identity-001',
          required: true,
        },
        {
          key: 'identityType',
          label: 'Identity Type',
          type: 'select',
          options: [
            { label: 'DID', value: 'did' },
            { label: 'ENS', value: 'ens' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'quantumAlgorithm',
          label: 'Quantum Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
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
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Signature', value: 'signature' },
            { label: 'ZK Proof', value: 'zk_proof' },
            { label: 'Attestation', value: 'attestation' },
          ],
          required: true,
        },
      ]}
    />
  )
}

