'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedVideoPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Video Platform"
      subtitle="Video platform with decentralized storage and NFT-based monetization"
      accent="red"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_VIDEO"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'storageProtocol',
          label: 'Storage Protocol',
          type: 'select',
          options: [
            { label: 'IPFS', value: 'ipfs' },
            { label: 'Arweave', value: 'arweave' },
            { label: 'Filecoin', value: 'filecoin' },
            { label: 'Multi-Protocol', value: 'multi' },
          ],
          required: true,
        },
        {
          key: 'monetizationType',
          label: 'Monetization Type',
          type: 'select',
          options: [
            { label: 'Ad Revenue', value: 'ad_revenue' },
            { label: 'Subscriptions', value: 'subscriptions' },
            { label: 'NFT Sales', value: 'nft_sales' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Video platform rules and monetization parameters',
        },
      ]}
    />
  )
}

