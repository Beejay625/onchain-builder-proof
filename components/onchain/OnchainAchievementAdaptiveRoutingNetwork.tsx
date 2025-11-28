'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveRoutingNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Routing Network"
      subtitle="Network with adaptive routing capabilities"
      accent="blue"
      ctaLabel="Deploy Network"
      payloadPrefix="ADAPTIVE_ROUTING"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'routingNodes',
          label: 'Routing Node Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
          required: true,
        },
        {
          key: 'routingAlgorithm',
          label: 'Routing Algorithm',
          type: 'select',
          options: [
            { label: 'Dijkstra', value: 'dijkstra' },
            { label: 'A*', value: 'a_star' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'adaptationSpeed',
          label: 'Adaptation Speed',
          type: 'select',
          options: [
            { label: 'Fast', value: 'fast' },
            { label: 'Medium', value: 'medium' },
            { label: 'Slow', value: 'slow' },
          ],
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Routing rules and adaptation parameters',
        },
      ]}
    />
  )
}

