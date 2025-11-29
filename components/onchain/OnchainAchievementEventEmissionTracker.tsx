'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementEventEmissionTracker(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Event Emission Tracker"
      subtitle="Tracks and indexes smart contract events"
      accent="cyan"
      ctaLabel="Deploy Tracker"
      payloadPrefix="EVENT_EMISSION_TRACKER"
      fields={[
        {
          key: 'trackerId',
          label: 'Tracker Identifier',
          type: 'text',
          placeholder: 'tracker-001',
          required: true,
        },
        {
          key: 'contractAddress',
          label: 'Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'eventTypes',
          label: 'Event Types',
          type: 'textarea',
          placeholder: 'Transfer,Approval,Mint,Burn',
          required: true,
        },
        {
          key: 'indexingMode',
          label: 'Indexing Mode',
          type: 'select',
          options: [
            { label: 'Real-Time', value: 'realtime' },
            { label: 'Batch', value: 'batch' },
            { label: 'On-Demand', value: 'on_demand' },
          ],
          required: true,
        },
        {
          key: 'trackerPolicy',
          label: 'Tracker Policy',
          type: 'textarea',
          placeholder: 'Event tracking rules and indexing parameters',
        },
      ]}
    />
  )
}

