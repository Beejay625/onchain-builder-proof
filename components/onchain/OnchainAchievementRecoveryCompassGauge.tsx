'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRecoveryCompassGauge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Recovery Compass Gauge"
      subtitle="Stream recovery KPIs"
      accent="sky"
      ctaLabel="Push Recovery KPI"
      payloadPrefix="COMPASS_GAUGE"
      fields={[
        {
          key: 'kpi',
          label: 'KPI',
          type: 'text',
          placeholder: 'Time-to-restore',
          required: true,
        },
        {
          key: 'currentValue',
          label: 'Current Value',
          type: 'number',
          placeholder: '42',
          required: true,
        },
        {
          key: 'target',
          label: 'Target Value',
          type: 'number',
          placeholder: '30',
          required: true,
        },
        {
          key: 'commentary',
          label: 'Commentary',
          type: 'textarea',
          placeholder: 'Context for leadership',
        },
      ]}
    />
  )
}
