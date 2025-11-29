'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainEventRelay(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Event Relay"
      subtitle="Relays events securely across chains"
      accent="indigo"
      ctaLabel="Deploy Relay"
      payloadPrefix="XCHAIN_EVENT_RELAY"
      fields={[
        {
          key: 'relayId',
          label: 'Relay Identifier',
          type: 'text',
          placeholder: 'relay-001',
          required: true,
        },
        {
          key: 'sourceChains',
          label: 'Source Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one',
          required: true,
        },
        {
          key: 'targetChains',
          label: 'Target Chains',
          type: 'textarea',
          placeholder: 'optimism,polygon',
          required: true,
        },
        {
          key: 'eventTypes',
          label: 'Event Types',
          type: 'textarea',
          placeholder: 'state_change,transaction,governance',
          required: true,
        },
        {
          key: 'relayPolicy',
          label: 'Relay Policy',
          type: 'textarea',
          placeholder: 'Event relay rules and security parameters',
        },
      ]}
    />
  )
}

