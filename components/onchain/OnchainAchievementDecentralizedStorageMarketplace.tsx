'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedStorageMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Storage Marketplace"
      subtitle="Marketplace for buying and selling decentralized storage"
      accent="indigo"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_STORAGE_MKT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
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
          key: 'pricingModel',
          label: 'Pricing Model',
          type: 'select',
          options: [
            { label: 'Per-GB-Per-Month', value: 'per_gb_per_month' },
            { label: 'One-Time', value: 'one_time' },
            { label: 'Subscription', value: 'subscription' },
          ],
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Storage marketplace rules and pricing parameters',
        },
      ]}
    />
  )
}

