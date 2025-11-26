'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTriageSwarmCoordinator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Triage Swarm Coordinator"
      subtitle="Spin up verified incident swarms"
      accent="emerald"
      ctaLabel="Register Swarm"
      payloadPrefix="TRIAGE_SWARM"
      fields={[
        {
        key: 'swarmLabel',
        label: 'Swarm Label',
        type: 'text',
        placeholder: 'ops-bridge-alpha',
        required: true,
        },
        {
        key: 'dutyWindow',
        label: 'Duty Window',
        type: 'text',
        placeholder: 'PT45M',
        required: true,
        },
        {
        key: 'capacity',
        label: 'Seat Count',
        type: 'number',
        placeholder: '5',
        required: true,
        },
        {
        key: 'channel',
        label: 'Channel',
        type: 'select',
        options: [
        { label: 'Discord', value: 'discord' },
        { label: 'Signal', value: 'signal' },
        { label: 'Bridge', value: 'bridge' },
        ],
        required: true,
        },
        {
        key: 'focus',
        label: 'Focus',
        type: 'textarea',
        placeholder: 'Contain RPC fallout, restore payouts, etc.',
        required: true,
        },
      ]}
    />
  )
}
