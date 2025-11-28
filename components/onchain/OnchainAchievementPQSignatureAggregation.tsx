'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPQSignatureAggregation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="PQ Signature Aggregation"
      subtitle="Aggregate signatures with post-quantum schemes"
      accent="purple"
      ctaLabel="Configure Aggregation"
      payloadPrefix="PQ_SIG_AGG"
      fields={[
        {
          key: 'aggregatorId',
          label: 'Aggregator Identifier',
          type: 'text',
          placeholder: 'agg-001',
          required: true,
        },
        {
          key: 'signatureScheme',
          label: 'Signature Scheme',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'aggregationMethod',
          label: 'Aggregation Method',
          type: 'select',
          options: [
            { label: 'Batch', value: 'batch' },
            { label: 'Sequential', value: 'sequential' },
            { label: 'Tree-Based', value: 'tree_based' },
          ],
          required: true,
        },
        {
          key: 'optimizationLevel',
          label: 'Optimization Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'aggregatorPolicy',
          label: 'Aggregator Policy',
          type: 'textarea',
          placeholder: 'Signature aggregation rules and optimization parameters',
        },
      ]}
    />
  )
}

