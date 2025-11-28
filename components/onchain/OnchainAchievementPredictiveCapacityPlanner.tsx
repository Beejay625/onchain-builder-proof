'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictiveCapacityPlanner(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Predictive Capacity Planner"
      subtitle="Planner for predictive capacity management"
      accent="yellow"
      ctaLabel="Deploy Planner"
      payloadPrefix="PREDICTIVE_CAPACITY"
      fields={[
        {
          key: 'plannerId',
          label: 'Planner Identifier',
          type: 'text',
          placeholder: 'planner-001',
          required: true,
        },
        {
          key: 'capacityTypes',
          label: 'Capacity Types',
          type: 'textarea',
          placeholder: 'compute,storage,bandwidth',
          required: true,
        },
        {
          key: 'planningHorizon',
          label: 'Planning Horizon (days)',
          type: 'number',
          placeholder: '90',
          required: true,
        },
        {
          key: 'planningModel',
          label: 'Planning Model',
          type: 'select',
          options: [
            { label: 'ML-Based', value: 'ml_based' },
            { label: 'Statistical', value: 'statistical' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'plannerPolicy',
          label: 'Planner Policy',
          type: 'textarea',
          placeholder: 'Capacity planning rules and prediction parameters',
        },
      ]}
    />
  )
}

