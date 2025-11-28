'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentQueryOptimizer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Query Optimizer"
      subtitle="Query optimizer with intelligent planning"
      accent="purple"
      ctaLabel="Deploy Optimizer"
      payloadPrefix="INTELLIGENT_QUERY"
      fields={[
        {
          key: 'optimizerId',
          label: 'Optimizer Identifier',
          type: 'text',
          placeholder: 'optimizer-001',
          required: true,
        },
        {
          key: 'queryTypes',
          label: 'Query Types',
          type: 'textarea',
          placeholder: 'read,write,aggregate,join',
          required: true,
        },
        {
          key: 'optimizationStrategy',
          label: 'Optimization Strategy',
          type: 'select',
          options: [
            { label: 'Cost-Based', value: 'cost_based' },
            { label: 'Rule-Based', value: 'rule_based' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'optimizationGoal',
          label: 'Optimization Goal',
          type: 'select',
          options: [
            { label: 'Latency', value: 'latency' },
            { label: 'Throughput', value: 'throughput' },
            { label: 'Resource-Usage', value: 'resource_usage' },
          ],
          required: true,
        },
        {
          key: 'optimizerPolicy',
          label: 'Optimizer Policy',
          type: 'textarea',
          placeholder: 'Query optimization rules and strategy parameters',
        },
      ]}
    />
  )
}

