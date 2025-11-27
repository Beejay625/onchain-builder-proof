'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshOrchestrationPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Orchestration Platform"
      subtitle="Platform for orchestrating mesh network operations"
      accent="indigo"
      ctaLabel="Deploy Platform"
      payloadPrefix="MESH_ORCH"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'orchestrationScope',
          label: 'Orchestration Scope',
          type: 'textarea',
          placeholder: 'networks,services,resources',
          required: true,
        },
        {
          key: 'orchestrationMode',
          label: 'Orchestration Mode',
          type: 'select',
          options: [
            { label: 'Centralized', value: 'centralized' },
            { label: 'Distributed', value: 'distributed' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'coordinationProtocol',
          label: 'Coordination Protocol',
          type: 'select',
          options: [
            { label: 'Consensus', value: 'consensus' },
            { label: 'Leader', value: 'leader' },
            { label: 'Gossip', value: 'gossip' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Orchestration rules and policies',
        },
      ]}
    />
  )
}

