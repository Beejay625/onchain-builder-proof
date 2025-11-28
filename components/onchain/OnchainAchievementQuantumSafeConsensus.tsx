'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSafeConsensus(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Safe Consensus"
      subtitle="Consensus mechanisms with post-quantum security"
      accent="violet"
      ctaLabel="Deploy Consensus"
      payloadPrefix="QSAFE_CONSENSUS"
      fields={[
        {
          key: 'consensusId',
          label: 'Consensus Identifier',
          type: 'text',
          placeholder: 'consensus-001',
          required: true,
        },
        {
          key: 'consensusAlgorithm',
          label: 'Consensus Algorithm',
          type: 'select',
          options: [
            { label: 'BFT', value: 'bft' },
            { label: 'PoS', value: 'pos' },
            { label: 'PoA', value: 'poa' },
          ],
          required: true,
        },
        {
          key: 'validatorCoordination',
          label: 'Validator Coordination',
          type: 'textarea',
          placeholder: 'Validator coordination rules and policies',
        },
        {
          key: 'consensusPolicy',
          label: 'Consensus Policy',
          type: 'textarea',
          placeholder: 'Consensus rules and validator parameters',
        },
      ]}
    />
  )
}

