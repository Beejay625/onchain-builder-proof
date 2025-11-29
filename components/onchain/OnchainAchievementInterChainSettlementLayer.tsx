'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementInterChainSettlementLayer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Inter-Chain Settlement Layer"
      subtitle="Settlement layer for cross-chain transactions"
      accent="blue"
      ctaLabel="Deploy Layer"
      payloadPrefix="INTERCHAIN_SETTLE"
      fields={[
        {
          key: 'layerId',
          label: 'Layer Identifier',
          type: 'text',
          placeholder: 'layer-001',
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
          key: 'settlementMode',
          label: 'Settlement Mode',
          type: 'select',
          options: [
            { label: 'Atomic', value: 'atomic' },
            { label: 'Optimistic', value: 'optimistic' },
            { label: 'Delayed', value: 'delayed' },
          ],
          required: true,
        },
        {
          key: 'finalityTime',
          label: 'Finality Time (seconds)',
          type: 'number',
          placeholder: '12',
          required: true,
        },
        {
          key: 'layerPolicy',
          label: 'Layer Policy',
          type: 'textarea',
          placeholder: 'Settlement layer rules and finality parameters',
        },
      ]}
    />
  )
}

