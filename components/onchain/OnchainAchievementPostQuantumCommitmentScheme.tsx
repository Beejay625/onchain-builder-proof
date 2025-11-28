'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostQuantumCommitmentScheme(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Quantum Commitment Scheme"
      subtitle="Commitments using post-quantum crypto"
      accent="cyan"
      ctaLabel="Create Commitment"
      payloadPrefix="PQ_COMMITMENT"
      fields={[
        {
          key: 'commitmentId',
          label: 'Commitment Identifier',
          type: 'text',
          placeholder: 'commit-001',
          required: true,
        },
        {
          key: 'commitmentAlgorithm',
          label: 'Commitment Algorithm',
          type: 'select',
          options: [
            { label: 'Pedersen', value: 'pedersen' },
            { label: 'Merkle', value: 'merkle' },
            { label: 'Hash-Based', value: 'hash_based' },
          ],
          required: true,
        },
        {
          key: 'revealSchedule',
          label: 'Reveal Schedule',
          type: 'textarea',
          placeholder: 'Reveal timing and conditions',
        },
        {
          key: 'commitmentPolicy',
          label: 'Commitment Policy',
          type: 'textarea',
          placeholder: 'Commitment rules and reveal parameters',
        },
      ]}
    />
  )
}

