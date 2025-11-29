'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeStateSynchronizer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge State Synchronizer"
      subtitle="Synchronizes state across bridge endpoints"
      accent="cyan"
      ctaLabel="Deploy Synchronizer"
      payloadPrefix="BRIDGE_STATE_SYNC"
      fields={[
        {
          key: 'synchronizerId',
          label: 'Synchronizer Identifier',
          type: 'text',
          placeholder: 'sync-001',
          required: true,
        },
        {
          key: 'bridgeEndpoints',
          label: 'Bridge Endpoints',
          type: 'textarea',
          placeholder: 'endpoint1,endpoint2,endpoint3',
          required: true,
        },
        {
          key: 'syncMode',
          label: 'Sync Mode',
          type: 'select',
          options: [
            { label: 'Real-Time', value: 'realtime' },
            { label: 'Batch', value: 'batch' },
            { label: 'Eventual', value: 'eventual' },
          ],
          required: true,
        },
        {
          key: 'syncInterval',
          label: 'Sync Interval (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'synchronizerPolicy',
          label: 'Synchronizer Policy',
          type: 'textarea',
          placeholder: 'State synchronization rules and interval parameters',
        },
      ]}
    />
  )
}

