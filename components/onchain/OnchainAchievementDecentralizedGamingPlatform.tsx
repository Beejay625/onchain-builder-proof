'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedGamingPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Gaming Platform"
      subtitle="Gaming platform with provably fair mechanics and NFT rewards"
      accent="pink"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_GAMING"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'gameType',
          label: 'Game Type',
          type: 'select',
          options: [
            { label: 'Turn-Based', value: 'turn_based' },
            { label: 'Real-Time', value: 'realtime' },
            { label: 'Strategy', value: 'strategy' },
            { label: 'Multi-Game', value: 'multi_game' },
          ],
          required: true,
        },
        {
          key: 'rewardToken',
          label: 'Reward Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'entryFee',
          label: 'Entry Fee',
          type: 'text',
          placeholder: '100000000000000000',
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Gaming platform rules and reward parameters',
        },
      ]}
    />
  )
}

