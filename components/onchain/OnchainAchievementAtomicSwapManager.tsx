'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAtomicSwapManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Atomic Swap Manager"
      subtitle="Manages atomic swaps for trustless cross-chain asset exchanges"
      accent="violet"
      ctaLabel="Initiate Swap"
      payloadPrefix="ATOMIC_SWAP_MGR"
      fields={[
        {
          key: 'swapId',
          label: 'Swap Identifier',
          type: 'text',
          placeholder: 'swap-001',
          required: true,
        },
        {
          key: 'assetA',
          label: 'Asset A',
          type: 'text',
          placeholder: 'ETH',
          required: true,
        },
        {
          key: 'assetB',
          label: 'Asset B',
          type: 'text',
          placeholder: 'BTC',
          required: true,
        },
        {
          key: 'swapType',
          label: 'Swap Type',
          type: 'select',
          options: [
            { label: 'Hash Time Lock', value: 'htlc' },
            { label: 'Script-Based', value: 'script' },
            { label: 'Contract-Based', value: 'contract' },
          ],
          required: true,
        },
        {
          key: 'timeoutPeriod',
          label: 'Timeout Period (blocks)',
          type: 'number',
          placeholder: '144',
          required: true,
        },
        {
          key: 'swapPolicy',
          label: 'Swap Policy',
          type: 'textarea',
          placeholder: 'Atomic swap rules and timeout parameters',
        },
      ]}
    />
  )
}
