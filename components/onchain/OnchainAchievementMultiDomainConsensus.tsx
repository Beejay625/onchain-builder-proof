'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiDomainConsensus(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Domain Consensus"
      subtitle="Consensus mechanism across multiple domains"
      accent="sky"
      ctaLabel="Propose Consensus"
      payloadPrefix="MULTI_CONSENSUS"
      fields={[
        {
          key: 'consensusId',
          label: 'Consensus Identifier',
          type: 'text',
          placeholder: 'consensus-001',
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
          key: 'participantDomains',
          label: 'Participant Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
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
          key: 'consensusPolicy',
          label: 'Consensus Policy',
          type: 'textarea',
          placeholder: 'Consensus rules and validation criteria',
        },
      ]}
    />
  )
}

