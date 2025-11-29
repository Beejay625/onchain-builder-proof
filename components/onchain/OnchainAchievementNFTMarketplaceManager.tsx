'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNFTMarketplaceManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="NFT Marketplace Manager"
      subtitle="Manages NFT marketplace with listing and trading"
      accent="purple"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="NFT_MARKETPLACE"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'nftContract',
          label: 'NFT Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'listingType',
          label: 'Listing Type',
          type: 'select',
          options: [
            { label: 'Fixed Price', value: 'fixed' },
            { label: 'Auction', value: 'auction' },
            { label: 'Both', value: 'both' },
          ],
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
          placeholder: 'NFT marketplace rules and fee parameters',
        },
      ]}
    />
  )
}

