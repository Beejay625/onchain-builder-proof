'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRunbookCircuitSwitch(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Runbook Circuit Switch"
      subtitle="Pause or resume automation circuits"
      accent="slate"
      ctaLabel="Toggle Circuit"
      payloadPrefix="RUNBOOK_SWITCH"
      fields=[
      {
              key: 'circuitId',
              label: 'Circuit ID',
              type: 'text',
              placeholder: 'vault-settlement-bot',
              required: true,
            },
      {
              key: 'state',
              label: 'Desired State',
              type: 'select',
              options: [
          { label: 'Disable', value: 'disable' },
          { label: 'Enable', value: 'enable' },
        ],
              required: true,
            },
      {
              key: 'fallback',
              label: 'Fallback Runbook',
              type: 'text',
              placeholder: 'Runbook URL or ID',
              required: true,
            },
      {
              key: 'expiry',
              label: 'Expiry',
              type: 'text',
              placeholder: 'UTC timestamp or ISO',
              required: true,
            },
      {
              key: 'reason',
              label: 'Reason',
              type: 'textarea',
              placeholder: 'Why the switch is happening',
              required: true,
            },
    ]
    />
  )
}
