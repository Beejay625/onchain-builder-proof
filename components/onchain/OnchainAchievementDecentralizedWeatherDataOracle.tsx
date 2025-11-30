'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedWeatherDataOracle(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Weather Data Oracle"
      subtitle="Oracle providing verified weather data from multiple sources"
      accent="sky"
      ctaLabel="Deploy Oracle"
      payloadPrefix="DECENTRALIZED_WEATHER_ORACLE"
      fields={[
        {
          key: 'oracleId',
          label: 'Oracle Identifier',
          type: 'text',
          placeholder: 'oracle-001',
          required: true,
        },
        {
          key: 'dataSources',
          label: 'Data Sources',
          type: 'textarea',
          placeholder: 'source1,source2,source3',
          required: true,
        },
        {
          key: 'updateFrequency',
          label: 'Update Frequency (minutes)',
          type: 'number',
          placeholder: '15',
          required: true,
        },
        {
          key: 'aggregationMethod',
          label: 'Aggregation Method',
          type: 'select',
          options: [
            { label: 'Average', value: 'average' },
            { label: 'Median', value: 'median' },
            { label: 'Weighted Average', value: 'weighted_avg' },
          ],
          required: true,
        },
        {
          key: 'oraclePolicy',
          label: 'Oracle Policy',
          type: 'textarea',
          placeholder: 'Weather oracle rules and aggregation parameters',
        },
      ]}
    />
  )
}

