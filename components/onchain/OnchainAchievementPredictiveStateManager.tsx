'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictiveStateManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Predictive State Manager"
      subtitle="State manager with predictive capabilities"
      accent="violet"
      ctaLabel="Deploy Manager"
      payloadPrefix="PREDICTIVE_STATE"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'stateDomains',
          label: 'State Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'predictionModel',
          label: 'Prediction Model',
          type: 'select',
          options: [
            { label: 'ML-Based', value: 'ml_based' },
            { label: 'Rule-Based', value: 'rule_based' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'predictionHorizon',
          label: 'Prediction Horizon (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'State management rules and prediction parameters',
        },
      ]}
    />
  )
}

