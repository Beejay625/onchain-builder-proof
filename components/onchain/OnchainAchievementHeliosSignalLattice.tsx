'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementHeliosSignalLattice(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Helios Signal Lattice"
      subtitle="Correlate multi-layer incident signals"
      accent="orange"
      ctaLabel="Record Signal Lattice"
      payloadPrefix="HELIOS_SIGNAL"
      fields={[
        {
        key: 'signalLayer',
        label: 'Signal Layer',
        type: 'select',
        options: [
        { label: 'Telemetry', value: 'telemetry' },
        { label: 'Governance', value: 'governance' },
        { label: 'Treasury', value: 'treasury' },
        ],
        required: true,
        },
        {
        key: 'indicator',
        label: 'Indicator',
        type: 'text',
        placeholder: 'Latency spike, vault drift, etc.',
        required: true,
        },
        {
        key: 'severity',
        label: 'Severity',
        type: 'select',
        options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Critical', value: 'critical' },
        ],
        required: true,
        },
        {
        key: 'summary',
        label: 'Summary',
        type: 'textarea',
        placeholder: 'Link the signals and expected blast zone',
        required: true,
        },
      ]}
    />
  )
}
