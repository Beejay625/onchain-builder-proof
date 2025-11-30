'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedPatentMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Patent Marketplace"
      subtitle="Marketplace for buying, selling, and licensing patents"
      accent="amber"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_PATENT_MKT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'licensingModel',
          label: 'Licensing Model',
          type: 'select',
          options: [
            { label: 'Exclusive', value: 'exclusive' },
            { label: 'Non-Exclusive', value: 'non_exclusive' },
            { label: 'Cross-License', value: 'cross_license' },
          ],
          required: true,
        },
        {
          key: 'royaltyStructure',
          label: 'Royalty Structure',
          type: 'select',
          options: [
            { label: 'Fixed', value: 'fixed' },
            { label: 'Percentage', value: 'percentage' },
            { label: 'Tiered', value: 'tiered' },
          ],
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Patent marketplace rules and licensing parameters',
        },
      ]}
    />
  )
}

