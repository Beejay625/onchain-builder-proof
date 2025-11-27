'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignConsensusMechanism(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Consensus Mechanism"
      subtitle="Consensus mechanism for sovereign operations"
      accent="violet"
      ctaLabel="Deploy Mechanism"
      payloadPrefix="SOV_CONSENSUS"
      fields={[
        {
          key: 'mechanismId',
          label: 'Mechanism Identifier',
          type: 'text',
          placeholder: 'mechanism-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
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
          key: 'consensusPolicy',
          label: 'Consensus Policy',
          type: 'textarea',
          placeholder: 'Consensus rules and sovereignty boundaries',
        },
      ]}
    />
  )
}

