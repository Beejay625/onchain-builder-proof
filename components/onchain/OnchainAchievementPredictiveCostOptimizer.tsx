'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictiveCostOptimizer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Predictive Cost Optimizer"
      subtitle="Optimizer for predictive cost management"
      accent="green"
      ctaLabel="Deploy Optimizer"
      payloadPrefix="PREDICTIVE_COST"
      fields={[
        {
          key: 'optimizerId',
          label: 'Optimizer Identifier',
          type: 'text',
          placeholder: 'optimizer-001',
          required: true,
        },
        {
          key: 'costCategories',
          label: 'Cost Categories',
          type: 'textarea',
          placeholder: 'compute,storage,bandwidth,operations',
          required: true,
        },
        {
          key: 'optimizationStrategy',
          label: 'Optimization Strategy',
          type: 'select',
          options: [
            { label: 'Cost-Minimization', value: 'cost_min' },
            { label: 'Cost-Performance', value: 'cost_perf' },
            { label: 'Predictive', value: 'predictive' },
          ],
          required: true,
        },
        {
          key: 'budgetConstraint',
          label: 'Budget Constraint',
          type: 'number',
          placeholder: '10000',
        },
        {
          key: 'optimizerPolicy',
          label: 'Optimizer Policy',
          type: 'textarea',
          placeholder: 'Cost optimization rules and budget parameters',
        },
      ]}
    />
  )
}

