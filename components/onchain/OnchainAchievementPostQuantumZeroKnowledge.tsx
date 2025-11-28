'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostQuantumZeroKnowledge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Quantum Zero-Knowledge"
      subtitle="ZK proofs using post-quantum primitives"
      accent="violet"
      ctaLabel="Create Proof"
      payloadPrefix="PQ_ZK"
      fields={[
        {
          key: 'proofId',
          label: 'Proof Identifier',
          type: 'text',
          placeholder: 'proof-001',
          required: true,
        },
        {
          key: 'proofSystem',
          label: 'Proof System',
          type: 'select',
          options: [
            { label: 'ZK-SNARK', value: 'zk_snark' },
            { label: 'ZK-STARK', value: 'zk_stark' },
            { label: 'Bulletproofs', value: 'bulletproofs' },
          ],
          required: true,
        },
        {
          key: 'verificationData',
          label: 'Verification Data',
          type: 'textarea',
          placeholder: 'Verification parameters and public inputs',
          required: true,
        },
        {
          key: 'proofPolicy',
          label: 'Proof Policy',
          type: 'textarea',
          placeholder: 'ZK proof rules and verification parameters',
        },
      ]}
    />
  )
}

