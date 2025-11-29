'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossProtocolBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Protocol Bridge"
      subtitle="Bridges assets and data across different protocols"
      accent="blue"
      ctaLabel="Deploy Bridge"
      payloadPrefix="CROSS_PROTOCOL_BRIDGE"
      fields={[
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'sourceProtocol',
          label: 'Source Protocol',
          type: 'text',
          placeholder: 'ethereum',
          required: true,
        },
        {
          key: 'targetProtocol',
          label: 'Target Protocol',
          type: 'text',
          placeholder: 'polygon',
          required: true,
        },
        {
          key: 'bridgeType',
          label: 'Bridge Type',
          type: 'select',
          options: [
            { label: 'Lock-and-Mint', value: 'lock_mint' },
            { label: 'Burn-and-Mint', value: 'burn_mint' },
            { label: 'Atomic Swap', value: 'atomic_swap' },
          ],
          required: true,
        },
        {
          key: 'bridgePolicy',
          label: 'Bridge Policy',
          type: 'textarea',
          placeholder: 'Cross-protocol bridge rules and type parameters',
        },
      ]}
    />
  )
}

