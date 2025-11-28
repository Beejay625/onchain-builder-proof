'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherEventStream(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Event Stream"
      subtitle="Event streaming for aether operations"
      accent="cyan"
      ctaLabel="Create Stream"
      payloadPrefix="AETHER_EVENT_STREAM"
      fields={[
        {
          key: 'streamId',
          label: 'Stream Identifier',
          type: 'text',
          placeholder: 'stream-001',
          required: true,
        },
        {
          key: 'eventTypes',
          label: 'Event Types',
          type: 'textarea',
          placeholder: 'state_change,governance,treasury,access',
          required: true,
        },
        {
          key: 'streamMode',
          label: 'Stream Mode',
          type: 'select',
          options: [
            { label: 'Real-time', value: 'realtime' },
            { label: 'Batch', value: 'batch' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'retentionPeriod',
          label: 'Retention Period (days)',
          type: 'number',
          placeholder: '30',
          required: true,
        },
        {
          key: 'streamPolicy',
          label: 'Stream Policy',
          type: 'textarea',
          placeholder: 'Event streaming rules and retention parameters',
        },
      ]}
    />
  )
}

