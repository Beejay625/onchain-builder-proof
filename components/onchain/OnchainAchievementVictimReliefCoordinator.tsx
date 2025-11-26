'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementVictimReliefCoordinator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Victim Relief Coordinator"
      subtitle="Pre-commit relief promises"
      accent="amber"
      ctaLabel="Register Relief Plan"
      payloadPrefix="RELIEF_COORD"
      fields={[
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
          key: 'unlock',
          label: 'Unlock Trigger',
          type: 'textarea',
          placeholder: 'After audit confirmation',
          required: true,
        },
        {
          key: 'reviewer',
          label: 'Reviewer',
          type: 'text',
          placeholder: 'treasury-ops',
          required: true,
        },
      ]}
    />
  )
}
