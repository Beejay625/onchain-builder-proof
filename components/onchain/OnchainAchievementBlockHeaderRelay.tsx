'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBlockHeaderRelay(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Block Header Relay"
      subtitle="Relays block headers for cross-chain verification"
      accent="cyan"
      ctaLabel="Deploy Relay"
      payloadPrefix="BLOCK_HEADER_RELAY"
      fields={[
        {
          key: 'relayId',
          label: 'Relay Identifier',
          type: 'text',
          placeholder: 'relay-001',
          required: true,
        },
        {
          key: 'sourceChain',
          label: 'Source Chain',
          type: 'text',
          placeholder: 'ethereum-mainnet',
          required: true,
        },
        {
          key: 'targetChain',
          label: 'Target Chain',
          type: 'text',
          placeholder: 'polygon',
          required: true,
        },
        {
          key: 'relayFrequency',
          label: 'Relay Frequency (blocks)',
          type: 'number',
          placeholder: '1',
          required: true,
        },
        {
          key: 'relayPolicy',
          label: 'Relay Policy',
          type: 'textarea',
          placeholder: 'Block header relay rules and frequency parameters',
        },
      ]}
    />
  )
}

