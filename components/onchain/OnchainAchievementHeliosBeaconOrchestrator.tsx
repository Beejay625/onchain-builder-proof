'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementHeliosBeaconOrchestrator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Helios Beacon Orchestrator"
      subtitle="Coordinate cross-layer incident beacons"
      accent="orange"
      ctaLabel="Record Beacon Signal"
      payloadPrefix="HELIOS_BEACON"
      fields={[
        {
          key: 'beaconLayer',
          label: 'Beacon Layer',
          type: 'select',
          options: [
            { label: 'Telemetry', value: 'telemetry' },
            { label: 'Governance', value: 'governance' },
            { label: 'Treasury', value: 'treasury' },
          ],
          required: true,
        },
        {
          key: 'signal',
          label: 'Signal Summary',
          type: 'text',
          placeholder: 'Sequencer drift, payout lag, etc.',
          required: true,
        },
        {
          key: 'confidence',
          label: 'Confidence',
          type: 'select',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ],
          required: true,
        },
        {
          key: 'notes',
          label: 'Notes',
          type: 'textarea',
          placeholder: 'Link companion alerts',
          required: true,
        },
      ]}
    />
  )
}
