'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictiveResourceAllocator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Predictive Resource Allocator"
      subtitle="Resource allocator with predictive capabilities"
      accent="yellow"
      ctaLabel="Deploy Allocator"
      payloadPrefix="PREDICTIVE_RESOURCE"
      fields={[
        {
          key: 'allocatorId',
          label: 'Allocator Identifier',
          type: 'text',
          placeholder: 'allocator-001',
          required: true,
        },
        {
          key: 'resourceTypes',
          label: 'Resource Types',
          type: 'textarea',
          placeholder: 'compute,storage,bandwidth',
          required: true,
        },
        {
          key: 'allocationStrategy',
          label: 'Allocation Strategy',
          type: 'select',
          options: [
            { label: 'Predictive', value: 'predictive' },
            { label: 'Reactive', value: 'reactive' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'predictionWindow',
          label: 'Prediction Window (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'allocatorPolicy',
          label: 'Allocator Policy',
          type: 'textarea',
          placeholder: 'Resource allocation rules and prediction parameters',
        },
      ]}
    />
  )
}

