'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictionMarketManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Prediction Market Manager"
      subtitle="Manages prediction markets with outcome resolution"
      accent="teal"
      ctaLabel="Create Market"
      payloadPrefix="PREDICTION_MARKET"
      fields={[
        {
          key: 'marketId',
          label: 'Market Identifier',
          type: 'text',
          placeholder: 'market-001',
          required: true,
        },
        {
          key: 'marketQuestion',
          label: 'Market Question',
          type: 'textarea',
          placeholder: 'Will ETH price exceed $5000 by end of year?',
          required: true,
        },
        {
          key: 'outcomeType',
          label: 'Outcome Type',
          type: 'select',
          options: [
            { label: 'Binary', value: 'binary' },
            { label: 'Multiple Choice', value: 'multiple' },
            { label: 'Scalar', value: 'scalar' },
          ],
          required: true,
        },
        {
          key: 'resolutionDate',
          label: 'Resolution Date',
          type: 'text',
          placeholder: '2024-12-31',
          required: true,
        },
        {
          key: 'marketPolicy',
          label: 'Market Policy',
          type: 'textarea',
          placeholder: 'Prediction market rules and resolution parameters',
        },
      ]}
    />
  )
}

