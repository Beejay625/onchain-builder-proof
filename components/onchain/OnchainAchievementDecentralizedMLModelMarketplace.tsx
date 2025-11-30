'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedMLModelMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized ML Model Marketplace"
      subtitle="Marketplace for buying and selling machine learning models"
      accent="purple"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_ML_MODEL_MKT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'modelType',
          label: 'Model Type',
          type: 'select',
          options: [
            { label: 'Neural Network', value: 'neural_network' },
            { label: 'Decision Tree', value: 'decision_tree' },
            { label: 'Support Vector Machine', value: 'svm' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'licensingModel',
          label: 'Licensing Model',
          type: 'select',
          options: [
            { label: 'One-Time', value: 'one_time' },
            { label: 'Subscription', value: 'subscription' },
            { label: 'Pay-Per-Use', value: 'pay_per_use' },
          ],
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'ML model marketplace rules and licensing parameters',
        },
      ]}
    />
  )
}

