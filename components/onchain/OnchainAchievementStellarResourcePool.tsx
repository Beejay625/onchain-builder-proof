'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarResourcePool(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Resource Pool"
      subtitle="Resource pool for stellar network operations"
      accent="yellow"
      ctaLabel="Create Pool"
      payloadPrefix="STELLAR_RESOURCE_POOL"
      fields={[
        {
          key: 'poolId',
          label: 'Pool Identifier',
          type: 'text',
          placeholder: 'pool-001',
          required: true,
        },
        {
          key: 'resourceTypes',
          label: 'Resource Types',
          type: 'textarea',
          placeholder: 'compute,storage,bandwidth',
          required: true,
        },
        {
          key: 'allocationStrategy',
          label: 'Allocation Strategy',
          type: 'select',
          options: [
            { label: 'Fair', value: 'fair' },
            { label: 'Priority-Based', value: 'priority' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'poolCapacity',
          label: 'Pool Capacity',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'poolPolicy',
          label: 'Pool Policy',
          type: 'textarea',
          placeholder: 'Resource pool rules and allocation parameters',
        },
      ]}
    />
  )
}

