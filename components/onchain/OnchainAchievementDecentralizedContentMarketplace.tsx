'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedContentMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Content Marketplace"
      subtitle="Marketplace for buying and selling digital content as NFTs"
      accent="violet"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_CONTENT_MKT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'contentCategory',
          label: 'Content Category',
          type: 'select',
          options: [
            { label: 'Art', value: 'art' },
            { label: 'Music', value: 'music' },
            { label: 'Video', value: 'video' },
            { label: 'Writing', value: 'writing' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'royaltyPercentage',
          label: 'Royalty Percentage (%)',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'marketplaceFee',
          label: 'Marketplace Fee (%)',
          type: 'number',
          placeholder: '2.5',
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Content marketplace rules and fee parameters',
        },
      ]}
    />
  )
}

