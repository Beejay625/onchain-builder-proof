'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIncidentSwarmSandbox(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Incident Swarm Sandbox"
      subtitle="Spin up rehearsal swarms"
      accent="rose"
      ctaLabel="Create Swarm Sandbox"
      payloadPrefix="SWARM_SANDBOX"
      fields={[
        {
          key: 'sandboxLabel',
          label: 'Sandbox Label',
          type: 'text',
          placeholder: 'bridge-sim-alpha',
          required: true,
        },
        {
          key: 'duration',
          label: 'Duration',
          type: 'text',
          placeholder: 'PT30M',
          required: true,
        },
        {
          key: 'participants',
          label: 'Participants',
          type: 'text',
          placeholder: 'guardian-a,guardian-b',
          required: true,
        },
        {
          key: 'objective',
          label: 'Objective',
          type: 'textarea',
          placeholder: 'Stress RPC replay, gauge failover',
          required: true,
        },
      ]}
    />
  )
}
