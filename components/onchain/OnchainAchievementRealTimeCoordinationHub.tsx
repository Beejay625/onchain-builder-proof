'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRealTimeCoordinationHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Real-Time Coordination Hub"
      subtitle="Hub for real-time coordination across networks"
      accent="cyan"
      ctaLabel="Deploy Hub"
      payloadPrefix="RT_COORD_HUB"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'connectedNetworks',
          label: 'Connected Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
          required: true,
        },
        {
          key: 'coordinationLatency',
          label: 'Coordination Latency (ms)',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'syncMode',
          label: 'Sync Mode',
          type: 'select',
          options: [
            { label: 'Real-Time', value: 'realtime' },
            { label: 'Near-Real-Time', value: 'near_realtime' },
            { label: 'Eventual', value: 'eventual' },
          ],
          required: true,
        },
        {
          key: 'hubPolicy',
          label: 'Hub Policy',
          type: 'textarea',
          placeholder: 'Coordination rules and latency requirements',
        },
      ]}
    />
  )
}

