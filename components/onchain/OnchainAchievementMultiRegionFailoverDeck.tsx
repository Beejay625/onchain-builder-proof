'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiRegionFailoverDeck(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Region Failover Deck"
      subtitle="Document region move playbooks"
      accent="blue"
      ctaLabel="Publish Failover Deck"
      payloadPrefix="FAILOVER_DECK"
      fields={[
        {
        key: 'primaryRegion',
        label: 'Primary Region',
        type: 'text',
        placeholder: 'us-east',
        required: true,
        },
        {
        key: 'standbyRegion',
        label: 'Standby Region',
        type: 'text',
        placeholder: 'eu-west',
        required: true,
        },
        {
        key: 'checklistUrl',
        label: 'Checklist URL',
        type: 'text',
        placeholder: 'https://...',
        required: true,
        },
        {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
        { label: 'Planned', value: 'planned' },
        { label: 'Ready', value: 'ready' },
        { label: 'Executed', value: 'executed' },
        ],
        required: true,
        },
        {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Validation steps',
        },
      ]}
    />
  )
}
