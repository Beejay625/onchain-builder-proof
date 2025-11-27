'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignNexusCoordinator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Nexus Coordinator"
      subtitle="Coordinate sovereign operations across nexus networks"
      accent="indigo"
      ctaLabel="Deploy Coordinator"
      payloadPrefix="SOV_NEXUS_COORD"
      fields={[
        {
          key: 'coordinatorId',
          label: 'Coordinator Identifier',
          type: 'text',
          placeholder: 'coord-001',
          required: true,
        },
        {
          key: 'nexusType',
          label: 'Nexus Type',
          type: 'select',
          options: [
            { label: 'Sovereign', value: 'sovereign' },
            { label: 'Federated', value: 'federated' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'participantSovereignties',
          label: 'Participant Sovereignties',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'coordinationProtocol',
          label: 'Coordination Protocol',
          type: 'select',
          options: [
            { label: 'Consensus-Based', value: 'consensus' },
            { label: 'Treaty-Based', value: 'treaty' },
            { label: 'Delegated', value: 'delegated' },
          ],
          required: true,
        },
        {
          key: 'sovereigntyPolicy',
          label: 'Sovereignty Policy',
          type: 'textarea',
          placeholder: 'Sovereignty rules and coordination boundaries',
        },
      ]}
    />
  )
}

