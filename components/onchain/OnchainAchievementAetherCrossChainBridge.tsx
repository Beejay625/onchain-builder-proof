'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherCrossChainBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Cross-Chain Bridge"
      subtitle="Cross-chain bridge for aether operations"
      accent="blue"
      ctaLabel="Deploy Bridge"
      payloadPrefix="AETHER_XCHAIN_BRIDGE"
      fields={[
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
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
          placeholder: 'arbitrum-one',
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
          placeholder: 'Cross-chain bridge rules and chain parameters',
        },
      ]}
    />
  )
}

