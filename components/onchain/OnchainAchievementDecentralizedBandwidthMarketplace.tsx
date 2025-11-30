'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedBandwidthMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Bandwidth Marketplace"
      subtitle="Marketplace for buying and selling network bandwidth"
      accent="cyan"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_BANDWIDTH_MKT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'bandwidthType',
          label: 'Bandwidth Type',
          type: 'select',
          options: [
            { label: 'Upload', value: 'upload' },
            { label: 'Download', value: 'download' },
            { label: 'Bidirectional', value: 'bidirectional' },
          ],
          required: true,
        },
        {
          key: 'pricingUnit',
          label: 'Pricing Unit',
          type: 'select',
          options: [
            { label: 'Per-GB', value: 'per_gb' },
            { label: 'Per-Month', value: 'per_month' },
            { label: 'Per-Connection', value: 'per_connection' },
          ],
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Bandwidth marketplace rules and pricing parameters',
        },
      ]}
    />
  )
}

