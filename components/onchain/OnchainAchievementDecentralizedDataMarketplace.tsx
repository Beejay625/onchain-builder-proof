'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedDataMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Data Marketplace"
      subtitle="Marketplace for buying and selling data with privacy-preserving access"
      accent="blue"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_DATA_MKT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'dataType',
          label: 'Data Type',
          type: 'select',
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Commercial', value: 'commercial' },
            { label: 'Research', value: 'research' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'accessModel',
          label: 'Access Model',
          type: 'select',
          options: [
            { label: 'Direct', value: 'direct' },
            { label: 'Compute-to-Data', value: 'compute_to_data' },
            { label: 'Federated Learning', value: 'federated' },
          ],
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Data marketplace rules and access parameters',
        },
      ]}
    />
  )
}

