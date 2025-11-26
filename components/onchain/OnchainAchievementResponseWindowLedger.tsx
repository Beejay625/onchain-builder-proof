'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementResponseWindowLedger(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Response Window Ledger"
      subtitle="Hold teams accountable to SLAs"
      accent="sky"
      ctaLabel="Record Response Window"
      payloadPrefix="RESPONSE_LEDGER"
      fields={[
        {
        key: 'stage',
        label: 'Stage',
        type: 'select',
        options: [
        { label: 'Detection', value: 'detection' },
        { label: 'Containment', value: 'containment' },
        { label: 'Recovery', value: 'recovery' },
        { label: 'Retro', value: 'retro' },
        ],
        required: true,
        },
        {
        key: 'windowMinutes',
        label: 'Window (minutes)',
        type: 'number',
        placeholder: '30',
        required: true,
        },
        {
        key: 'owner',
        label: 'Owner',
        type: 'text',
        placeholder: 'squad lead',
        required: true,
        },
        {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Next checkpoint or KPI',
        },
      ]}
    />
  )
}
