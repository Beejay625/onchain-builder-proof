'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignMeshCoordinator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Mesh Coordinator"
      subtitle="Coordinate operations across sovereign mesh networks"
      accent="indigo"
      ctaLabel="Deploy Coordinator"
      payloadPrefix="SOV_MESH_COORD"
      fields={[
        {
          key: 'coordinatorId',
          label: 'Coordinator Identifier',
          type: 'text',
          placeholder: 'coord-001',
          required: true,
        },
        {
          key: 'meshTopology',
          label: 'Mesh Topology',
          type: 'select',
          options: [
            { label: 'Star', value: 'star' },
            { label: 'Ring', value: 'ring' },
            { label: 'Mesh', value: 'mesh' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'participantNodes',
          label: 'Participant Node Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
          required: true,
        },
        {
          key: 'coordinationProtocol',
          label: 'Coordination Protocol',
          type: 'select',
          options: [
            { label: 'Consensus-Based', value: 'consensus' },
            { label: 'Leader-Based', value: 'leader' },
            { label: 'Gossip', value: 'gossip' },
          ],
          required: true,
        },
        {
          key: 'heartbeatInterval',
          label: 'Heartbeat Interval (seconds)',
          type: 'number',
          placeholder: '30',
          required: true,
        },
      ]}
    />
  )
}

