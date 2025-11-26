'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRunbookDeltaCodex(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Runbook Delta Codex"
      subtitle="Log runbook delta decisions"
      accent="slate"
      ctaLabel="Record Runbook Delta"
      payloadPrefix="DELTA_CODEX"
      fields={[
        {
          key: 'runbookId',
          label: 'Runbook ID',
          type: 'text',
          placeholder: 'payouts-v4',
          required: true,
        },
        {
          key: 'deltaType',
          label: 'Delta Type',
          type: 'select',
          options: [
            { label: 'Override', value: 'override' },
            { label: 'Rollback', value: 'rollback' },
            { label: 'Experiment', value: 'experiment' },
          ],
          required: true,
        },
        {
          key: 'fallback',
          label: 'Fallback',
          type: 'text',
          placeholder: 'Link to fallback doc',
          required: true,
        },
        {
          key: 'reason',
          label: 'Reason',
          type: 'textarea',
          placeholder: 'Context for the change',
          required: true,
        },
      ]}
    />
  )
}
