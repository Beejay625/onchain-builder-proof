'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementLiquidityPoolManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Liquidity Pool Manager"
      subtitle="Manages liquidity pools with automated market making"
      accent="blue"
      ctaLabel="Create Pool"
      payloadPrefix="LIQUIDITY_POOL_MGR"
      fields={[
        {
          key: 'poolId',
          label: 'Pool Identifier',
          type: 'text',
          placeholder: 'pool-001',
          required: true,
        },
        {
          key: 'tokenA',
          label: 'Token A Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'tokenB',
          label: 'Token B Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'poolType',
          label: 'Pool Type',
          type: 'select',
          options: [
            { label: 'Constant Product', value: 'constant_product' },
            { label: 'Stable', value: 'stable' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'feePercentage',
          label: 'Fee Percentage',
          type: 'number',
          placeholder: '0.3',
          required: true,
        },
        {
          key: 'poolPolicy',
          label: 'Pool Policy',
          type: 'textarea',
          placeholder: 'Liquidity pool rules and fee parameters',
        },
      ]}
    />
  )
}

