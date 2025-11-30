'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedMusicPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Music Platform"
      subtitle="Music platform with NFT-based ownership and streaming rewards"
      accent="purple"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_MUSIC"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'streamingModel',
          label: 'Streaming Model',
          type: 'select',
          options: [
            { label: 'Pay-Per-Stream', value: 'pay_per_stream' },
            { label: 'Subscription', value: 'subscription' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'royaltyDistribution',
          label: 'Royalty Distribution',
          type: 'select',
          options: [
            { label: 'Proportional', value: 'proportional' },
            { label: 'Equal', value: 'equal' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Music platform rules and streaming parameters',
        },
      ]}
    />
  )
}

