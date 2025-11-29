'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeLiquidityMonitor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Liquidity Monitor"
      subtitle="Monitors bridge liquidity across chains"
      accent="yellow"
      ctaLabel="Deploy Monitor"
      payloadPrefix="BRIDGE_LIQUIDITY_MON"
      fields={[
        {
          key: 'monitorId',
          label: 'Monitor Identifier',
          type: 'text',
          placeholder: 'monitor-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
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
          key: 'thresholdLevel',
          label: 'Threshold Level',
          type: 'select',
          options: [
            { label: 'Critical', value: 'critical' },
            { label: 'Warning', value: 'warning' },
            { label: 'Normal', value: 'normal' },
          ],
          required: true,
        },
        {
          key: 'monitorPolicy',
          label: 'Monitor Policy',
          type: 'textarea',
          placeholder: 'Liquidity monitoring rules and threshold parameters',
        },
      ]}
    />
  )
}

