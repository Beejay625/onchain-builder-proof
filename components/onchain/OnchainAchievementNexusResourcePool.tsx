'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusResourcePool(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Resource Pool"
      subtitle="Resource pool for nexus network operations"
      accent="yellow"
      ctaLabel="Create Pool"
      payloadPrefix="NEXUS_RESOURCE_POOL"
      fields={[
        {
          key: 'poolId',
          label: 'Pool Identifier',
          type: 'text',
          placeholder: 'pool-001',
          required: true,
        },
        {
          key: 'nexusId',
          label: 'Nexus Network ID',
          type: 'text',
          placeholder: 'nexus-001',
          required: true,
        },
        {
          key: 'resourceTypes',
          label: 'Resource Types',
          type: 'textarea',
          placeholder: 'compute,storage,bandwidth,sovereignty',
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
          placeholder: 'Resource allocation rules and limits',
        },
      ]}
    />
  )
}

