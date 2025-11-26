'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTreasuryFusionVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Treasury Fusion Vault"
      subtitle="Fuse treasury operations across chains"
      accent="yellow"
      ctaLabel="Deploy Fusion Vault"
      payloadPrefix="TREASURY_FUSION"
      fields={[
        {
          key: 'vaultAddress',
          label: 'Vault Contract Address',
          type: 'text',
          placeholder: '0x...',
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
          key: 'fusionMode',
          label: 'Fusion Mode',
          type: 'select',
          options: [
            { label: 'Aggregated', value: 'aggregated' },
            { label: 'Segregated', value: 'segregated' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'rebalanceThreshold',
          label: 'Rebalance Threshold (%)',
          type: 'number',
          placeholder: '5',
          required: true,
        },
        {
          key: 'chainDistribution',
          label: 'Chain Distribution',
          type: 'textarea',
          placeholder: 'ethereum:40,arbitrum:30,optimism:30',
          required: true,
        },
        {
          key: 'riskPolicy',
          label: 'Risk Policy',
          type: 'textarea',
          placeholder: 'Risk limits and mitigation strategies',
        },
      ]}
    />
  )
}

