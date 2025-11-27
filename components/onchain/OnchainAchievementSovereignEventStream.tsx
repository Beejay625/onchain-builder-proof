'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignEventStream(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Event Stream"
      subtitle="Event streaming for sovereign operations"
      accent="cyan"
      ctaLabel="Create Stream"
      payloadPrefix="SOV_EVENT_STREAM"
      fields={[
        {
          key: 'streamId',
          label: 'Stream Identifier',
          type: 'text',
          placeholder: 'stream-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
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
          placeholder: 'Event streaming rules and sovereignty compliance',
        },
      ]}
    />
  )
}

