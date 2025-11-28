'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherTreasuryNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Treasury Network"
      subtitle="Treasury network for aether operations"
      accent="yellow"
      ctaLabel="Deploy Network"
      payloadPrefix="AETHER_TREASURY_NET"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'assetTypes',
          label: 'Asset Types',
          type: 'textarea',
          placeholder: 'ETH,USDC,DAI,WBTC',
          required: true,
        },
        {
          key: 'networkType',
          label: 'Network Type',
          type: 'select',
          options: [
            { label: 'Shared', value: 'shared' },
            { label: 'Segregated', value: 'segregated' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Treasury network rules and asset parameters',
        },
      ]}
    />
  )
}

