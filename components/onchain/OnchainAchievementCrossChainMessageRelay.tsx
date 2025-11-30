'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainMessageRelay(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Message Relay"
      subtitle="Relays messages between different blockchain networks"
      accent="blue"
      ctaLabel="Deploy Relay"
      payloadPrefix="XCHAIN_MSG_RELAY"
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
          key: 'relayProtocol',
          label: 'Relay Protocol',
          type: 'select',
          options: [
            { label: 'IBC', value: 'ibc' },
            { label: 'XCMP', value: 'xcmp' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'relayPolicy',
          label: 'Relay Policy',
          type: 'textarea',
          placeholder: 'Message relay rules and protocol parameters',
        },
      ]}
    />
  )
}

