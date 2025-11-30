'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAtomicSwapManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Atomic Swap Manager"
      subtitle="Manages atomic swaps between different assets and chains"
      accent="violet"
      ctaLabel="Initiate Swap"
      payloadPrefix="ATOMIC_SWAP_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
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
            { label: 'Hash-Locked', value: 'hash_locked' },
            { label: 'Time-Locked', value: 'time_locked' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'timeoutDuration',
          label: 'Timeout Duration (seconds)',
          type: 'number',
          placeholder: '3600',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Atomic swap rules and timeout parameters',
        },
      ]}
    />
  )
}

