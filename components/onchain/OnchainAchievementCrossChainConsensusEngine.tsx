'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainConsensusEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Consensus Engine"
      subtitle="Consensus mechanisms for cross-chain operations"
      accent="teal"
      ctaLabel="Deploy Engine"
      payloadPrefix="XCHAIN_CONSENSUS"
      fields={[
        {
          key: 'engineId',
          label: 'Engine Identifier',
          type: 'text',
          placeholder: 'engine-001',
          required: true,
        },
        {
          key: 'participantChains',
          label: 'Participant Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
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
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'quorumSize',
          label: 'Quorum Size',
          type: 'number',
          placeholder: '5',
          required: true,
        },
        {
          key: 'enginePolicy',
          label: 'Engine Policy',
          type: 'textarea',
          placeholder: 'Consensus engine rules and quorum parameters',
        },
      ]}
    />
  )
}

