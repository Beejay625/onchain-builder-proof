'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPriceOracleAggregator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Price Oracle Aggregator"
      subtitle="Aggregates price data from multiple oracle sources"
      accent="yellow"
      ctaLabel="Deploy Aggregator"
      payloadPrefix="PRICE_ORACLE_AGG"
      fields={[
        {
          key: 'aggregatorId',
          label: 'Aggregator Identifier',
          type: 'text',
          placeholder: 'agg-001',
          required: true,
        },
        {
          key: 'oracleSources',
          label: 'Oracle Sources',
          type: 'textarea',
          placeholder: 'chainlink,uniswap,band-protocol',
          required: true,
        },
        {
          key: 'aggregationMethod',
          label: 'Aggregation Method',
          type: 'select',
          options: [
            { label: 'Median', value: 'median' },
            { label: 'Weighted Average', value: 'weighted_avg' },
            { label: 'Trimmed Mean', value: 'trimmed_mean' },
          ],
          required: true,
        },
        {
          key: 'updateInterval',
          label: 'Update Interval (seconds)',
          type: 'number',
          placeholder: '3600',
          required: true,
        },
        {
          key: 'aggregatorPolicy',
          label: 'Aggregator Policy',
          type: 'textarea',
          placeholder: 'Price oracle aggregation rules and interval parameters',
        },
      ]}
    />
  )
}

