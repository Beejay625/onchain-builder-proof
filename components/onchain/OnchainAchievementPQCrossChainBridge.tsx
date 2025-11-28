'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPQCrossChainBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="PQ Cross-Chain Bridge"
      subtitle="Cross-chain bridges with post-quantum verification"
      accent="cyan"
      ctaLabel="Deploy Bridge"
      payloadPrefix="PQ_XCHAIN_BRIDGE"
      fields={[
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'chainReferences',
          label: 'Chain References',
          type: 'textarea',
          placeholder: 'chain1,chain2,chain3',
          required: true,
        },
        {
          key: 'finalityTracking',
          label: 'Finality Tracking',
          type: 'select',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' },
          ],
          required: true,
        },
        {
          key: 'bridgePolicy',
          label: 'Bridge Policy',
          type: 'textarea',
          placeholder: 'Cross-chain bridge rules and finality parameters',
        },
      ]}
    />
  )
}

