'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementResponseTempoLedger(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Response Tempo Ledger"
      subtitle="Hold teams to response tempos"
      accent="sky"
      ctaLabel="Record Tempo Window"
      payloadPrefix="TEMPO_LEDGER"
      fields={[
        {
          key: 'milestone',
          label: 'Milestone',
          type: 'text',
          placeholder: 'Containment',
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
          placeholder: 'squad-lead',
          required: true,
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { label: 'On Track', value: 'on_track' },
            { label: 'Lagging', value: 'lagging' },
            { label: 'Missed', value: 'missed' },
          ],
          required: true,
        },
      ]}
    />
  )
}
