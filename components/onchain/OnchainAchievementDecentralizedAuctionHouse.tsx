'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedAuctionHouse(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Auction House"
      subtitle="Manages auctions with multiple auction types and bidding mechanisms"
      accent="orange"
      ctaLabel="Create Auction"
      payloadPrefix="DECENTRALIZED_AUCTION"
      fields={[
        {
          key: 'auctionId',
          label: 'Auction Identifier',
          type: 'text',
          placeholder: 'auction-001',
          required: true,
        },
        {
          key: 'auctionType',
          label: 'Auction Type',
          type: 'select',
          options: [
            { label: 'English', value: 'english' },
            { label: 'Dutch', value: 'dutch' },
            { label: 'Sealed Bid', value: 'sealed_bid' },
            { label: 'Vickrey', value: 'vickrey' },
          ],
          required: true,
        },
        {
          key: 'itemType',
          label: 'Item Type',
          type: 'select',
          options: [
            { label: 'NFT', value: 'nft' },
            { label: 'Token', value: 'token' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'duration',
          label: 'Duration (blocks)',
          type: 'number',
          placeholder: '17280',
          required: true,
        },
        {
          key: 'auctionPolicy',
          label: 'Auction Policy',
          type: 'textarea',
          placeholder: 'Auction house rules and duration parameters',
        },
      ]}
    />
  )
}

