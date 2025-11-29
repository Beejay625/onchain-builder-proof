'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAutomatedMarketMaker(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Automated Market Maker"
      subtitle="Automated market making with liquidity pools"
      accent="blue"
      ctaLabel="Deploy AMM"
      payloadPrefix="AUTOMATED_MM"
      fields={[
        {
          key: 'ammId',
          label: 'AMM Identifier',
          type: 'text',
          placeholder: 'amm-001',
          required: true,
        },
        {
          key: 'tokenPair',
          label: 'Token Pair',
          type: 'textarea',
          placeholder: 'tokenA,tokenB',
          required: true,
        },
        {
          key: 'ammType',
          label: 'AMM Type',
          type: 'select',
          options: [
            { label: 'Constant Product', value: 'constant_product' },
            { label: 'Stable', value: 'stable' },
            { label: 'Weighted', value: 'weighted' },
            { label: 'Concentrated', value: 'concentrated' },
          ],
          required: true,
        },
        {
          key: 'swapFee',
          label: 'Swap Fee (%)',
          type: 'number',
          placeholder: '0.3',
          required: true,
        },
        {
          key: 'ammPolicy',
          label: 'AMM Policy',
          type: 'textarea',
          placeholder: 'AMM rules and fee parameters',
        },
      ]}
    />
  )
}

