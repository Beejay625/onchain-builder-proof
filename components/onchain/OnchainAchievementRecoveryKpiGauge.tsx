'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRecoveryKpiGauge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Recovery KPI Gauge"
      subtitle="Stream realtime recovery KPIs"
      accent="sky"
      ctaLabel="Push KPI Reading"
      payloadPrefix="RECOVERY_GAUGE"
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
        key: 'confidence',
        label: 'Confidence Band',
        type: 'text',
        placeholder: '+/- 5%',
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
