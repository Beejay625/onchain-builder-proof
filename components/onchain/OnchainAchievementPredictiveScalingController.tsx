'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictiveScalingController(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Predictive Scaling Controller"
      subtitle="Controller for predictive scaling operations"
      accent="sky"
      ctaLabel="Deploy Controller"
      payloadPrefix="PREDICTIVE_SCALING"
      fields={[
        {
          key: 'controllerId',
          label: 'Controller Identifier',
          type: 'text',
          placeholder: 'controller-001',
          required: true,
        },
        {
          key: 'scalableResources',
          label: 'Scalable Resources',
          type: 'textarea',
          placeholder: 'resource1,resource2,resource3',
          required: true,
        },
        {
          key: 'scalingStrategy',
          label: 'Scaling Strategy',
          type: 'select',
          options: [
            { label: 'Predictive', value: 'predictive' },
            { label: 'Reactive', value: 'reactive' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'scalingWindow',
          label: 'Scaling Window (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'controllerPolicy',
          label: 'Controller Policy',
          type: 'textarea',
          placeholder: 'Scaling rules and prediction parameters',
        },
      ]}
    />
  )
}

