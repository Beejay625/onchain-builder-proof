'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherOrchestrationPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Orchestration Platform"
      subtitle="Platform for orchestrating aether operations"
      accent="indigo"
      ctaLabel="Deploy Platform"
      payloadPrefix="AETHER_ORCH_PLATFORM"
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
          placeholder: 'networks,services,resources,operations',
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
          placeholder: 'Orchestration platform rules and coordination parameters',
        },
      ]}
    />
  )
}

