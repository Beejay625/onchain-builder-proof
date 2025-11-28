'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarConsensusOracle(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Consensus Oracle"
      subtitle="Oracle for stellar consensus decisions"
      accent="teal"
      ctaLabel="Deploy Oracle"
      payloadPrefix="STELLAR_CONSENSUS"
      fields={[
        {
          key: 'oracleId',
          label: 'Oracle Identifier',
          type: 'text',
          placeholder: 'oracle-001',
          required: true,
        },
        {
          key: 'consensusType',
          label: 'Consensus Type',
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
          key: 'finalityThreshold',
          label: 'Finality Threshold (%)',
          type: 'number',
          placeholder: '67',
          required: true,
        },
        {
          key: 'oraclePolicy',
          label: 'Oracle Policy',
          type: 'textarea',
          placeholder: 'Consensus oracle rules and quorum parameters',
        },
      ]}
    />
  )
}

