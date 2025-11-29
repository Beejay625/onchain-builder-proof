'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementReputationSystemManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Reputation System Manager"
      subtitle="Manages reputation scores with weighted contributions"
      accent="purple"
      ctaLabel="Deploy System"
      payloadPrefix="REPUTATION_SYSTEM"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'reputationFactors',
          label: 'Reputation Factors',
          type: 'textarea',
          placeholder: 'transactions,governance,contributions',
          required: true,
        },
        {
          key: 'scoringModel',
          label: 'Scoring Model',
          type: 'select',
          options: [
            { label: 'Linear', value: 'linear' },
            { label: 'Exponential', value: 'exponential' },
            { label: 'Logarithmic', value: 'logarithmic' },
          ],
          required: true,
        },
        {
          key: 'decayRate',
          label: 'Decay Rate (% per period)',
          type: 'number',
          placeholder: '1',
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'Reputation system rules and scoring parameters',
        },
      ]}
    />
  )
}

