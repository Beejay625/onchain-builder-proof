'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGasOptimizationEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Gas Optimization Engine"
      subtitle="Optimizes gas usage for smart contract operations"
      accent="yellow"
      ctaLabel="Optimize Gas"
      payloadPrefix="GAS_OPTIMIZATION"
      fields={[
        {
          key: 'engineId',
          label: 'Engine Identifier',
          type: 'text',
          placeholder: 'engine-001',
          required: true,
        },
        {
          key: 'targetContract',
          label: 'Target Contract',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'optimizationStrategy',
          label: 'Optimization Strategy',
          type: 'select',
          options: [
            { label: 'Storage', value: 'storage' },
            { label: 'Computation', value: 'computation' },
            { label: 'Memory', value: 'memory' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'targetReduction',
          label: 'Target Reduction (%)',
          type: 'number',
          placeholder: '20',
          required: true,
        },
        {
          key: 'enginePolicy',
          label: 'Engine Policy',
          type: 'textarea',
          placeholder: 'Gas optimization rules and strategy parameters',
        },
      ]}
    />
  )
}

