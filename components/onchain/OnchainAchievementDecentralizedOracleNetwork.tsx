'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedOracleNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Oracle Network"
      subtitle="Decentralized oracle network for reliable data feeds"
      accent="blue"
      ctaLabel="Deploy Network"
      payloadPrefix="DECENTRALIZED_ORACLE"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'dataSources',
          label: 'Data Sources',
          type: 'textarea',
          placeholder: 'price-feeds,weather-data,market-data',
          required: true,
        },
        {
          key: 'consensusModel',
          label: 'Consensus Model',
          type: 'select',
          options: [
            { label: 'Quorum', value: 'quorum' },
            { label: 'Weighted', value: 'weighted' },
            { label: 'Threshold', value: 'threshold' },
          ],
          required: true,
        },
        {
          key: 'oracleCount',
          label: 'Oracle Count',
          type: 'number',
          placeholder: '7',
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Oracle network rules and consensus parameters',
        },
      ]}
    />
  )
}

