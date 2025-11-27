'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumProofVerifier(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Proof Verifier"
      subtitle="Verify quantum-resistant proofs"
      accent="indigo"
      ctaLabel="Verify Proof"
      payloadPrefix="QPROOF_VERIFY"
      fields={[
        {
          key: 'verifierId',
          label: 'Verifier Identifier',
          type: 'text',
          placeholder: 'verifier-001',
          required: true,
        },
        {
          key: 'proofHash',
          label: 'Proof Hash',
          type: 'text',
          placeholder: '0x...',
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
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'verificationStatus',
          label: 'Verification Status',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Verified', value: 'verified' },
            { label: 'Failed', value: 'failed' },
          ],
          required: true,
        },
        {
          key: 'verificationProof',
          label: 'Verification Proof Hash',
          type: 'text',
          placeholder: '0x...',
        },
      ]}
    />
  )
}

