'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveNetworkTopology(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Network Topology"
      subtitle="Network topology with adaptive reconfiguration"
      accent="blue"
      ctaLabel="Deploy Topology"
      payloadPrefix="ADAPTIVE_TOPOLOGY"
      fields={[
        {
          key: 'topologyId',
          label: 'Topology Identifier',
          type: 'text',
          placeholder: 'topology-001',
          required: true,
        },
        {
          key: 'networkNodes',
          label: 'Network Node Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
          required: true,
        },
        {
          key: 'topologyType',
          label: 'Topology Type',
          type: 'select',
          options: [
            { label: 'Mesh', value: 'mesh' },
            { label: 'Star', value: 'star' },
            { label: 'Ring', value: 'ring' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'reconfigurationTrigger',
          label: 'Reconfiguration Trigger',
          type: 'select',
          options: [
            { label: 'Performance', value: 'performance' },
            { label: 'Failure', value: 'failure' },
            { label: 'Load', value: 'load' },
          ],
          required: true,
        },
        {
          key: 'topologyPolicy',
          label: 'Topology Policy',
          type: 'textarea',
          placeholder: 'Topology rules and reconfiguration parameters',
        },
      ]}
    />
  )
}

