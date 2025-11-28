'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarStateSynchronizer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar State Synchronizer"
      subtitle="Synchronize state across stellar networks"
      accent="cyan"
      ctaLabel="Deploy Synchronizer"
      payloadPrefix="STELLAR_STATE_SYNC"
      fields={[
        {
          key: 'synchronizerId',
          label: 'Synchronizer Identifier',
          type: 'text',
          placeholder: 'sync-001',
          required: true,
        },
        {
          key: 'sourceNetworks',
          label: 'Source Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
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
          key: 'synchronizerPolicy',
          label: 'Synchronizer Policy',
          type: 'textarea',
          placeholder: 'State synchronization rules and network parameters',
        },
      ]}
    />
  )
}

