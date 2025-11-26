'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementVictimCompensationPool(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Victim Compensation Pool"
      subtitle="Wire remediation payouts"
      accent="amber"
      ctaLabel="Open Compensation Pool"
      payloadPrefix="VICTIM_COMP_POOL"
      fields=[
      {
              key: 'cohort',
              label: 'Victim Cohort',
              type: 'text',
              placeholder: 'Quest builders',
              required: true,
            },
      {
              key: 'token',
              label: 'Token',
              type: 'select',
              options: [
          { label: 'USDC', value: 'USDC' },
          { label: 'DAI', value: 'DAI' },
          { label: 'USDT', value: 'USDT' },
        ],
              required: true,
            },
      {
              key: 'unlockTrigger',
              label: 'Unlock Trigger',
              type: 'textarea',
              placeholder: 'After audit confirmation',
              required: true,
            },
      {
              key: 'vaultId',
              label: 'Vault ID',
              type: 'text',
              placeholder: 'treasury-7',
              required: true,
            },
      {
              key: 'notes',
              label: 'Notes',
              type: 'textarea',
              placeholder: 'Distribution cadence',
            },
    ]
    />
  )
}
