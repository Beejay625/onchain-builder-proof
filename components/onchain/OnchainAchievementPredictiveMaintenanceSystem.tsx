'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictiveMaintenanceSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Predictive Maintenance System"
      subtitle="System for predictive maintenance operations"
      accent="slate"
      ctaLabel="Deploy System"
      payloadPrefix="PREDICTIVE_MAINT"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'monitoredComponents',
          label: 'Monitored Components',
          type: 'textarea',
          placeholder: 'component1,component2,component3',
          required: true,
        },
        {
          key: 'maintenanceStrategy',
          label: 'Maintenance Strategy',
          type: 'select',
          options: [
            { label: 'Predictive', value: 'predictive' },
            { label: 'Preventive', value: 'preventive' },
            { label: 'Reactive', value: 'reactive' },
          ],
          required: true,
        },
        {
          key: 'predictionHorizon',
          label: 'Prediction Horizon (days)',
          type: 'number',
          placeholder: '30',
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'Maintenance rules and prediction parameters',
        },
      ]}
    />
  )
}

