'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntentAggregationPool(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intent Aggregation Pool"
      subtitle="Pool and aggregate intents for efficiency"
      accent="amber"
      ctaLabel="Aggregate Intent"
      payloadPrefix="INTENT_POOL"
      fields={[
        {
          key: 'poolId',
          label: 'Pool Identifier',
          type: 'text',
          placeholder: 'pool-001',
          required: true,
        },
        {
          key: 'intentCount',
          label: 'Intent Count',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'aggregationStrategy',
          label: 'Aggregation Strategy',
          type: 'select',
          options: [
            { label: 'Time-based', value: 'time' },
            { label: 'Size-based', value: 'size' },
            { label: 'Priority-based', value: 'priority' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'batchSize',
          label: 'Batch Size',
          type: 'number',
          placeholder: '50',
          required: true,
        },
        {
          key: 'timeWindow',
          label: 'Time Window (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'intentHashes',
          label: 'Intent Hashes',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
        },
      ]}
    />
  )
}

