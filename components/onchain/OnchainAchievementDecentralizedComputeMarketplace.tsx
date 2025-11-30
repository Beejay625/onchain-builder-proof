'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedComputeMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Compute Marketplace"
      subtitle="Marketplace for buying and selling computational resources"
      accent="purple"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_COMPUTE_MKT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'computeType',
          label: 'Compute Type',
          type: 'select',
          options: [
            { label: 'CPU', value: 'cpu' },
            { label: 'GPU', value: 'gpu' },
            { label: 'FPGA', value: 'fpga' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'pricingModel',
          label: 'Pricing Model',
          type: 'select',
          options: [
            { label: 'Per-Hour', value: 'per_hour' },
            { label: 'Per-Task', value: 'per_task' },
            { label: 'Auction', value: 'auction' },
          ],
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Compute marketplace rules and pricing parameters',
        },
      ]}
    />
  )
}

