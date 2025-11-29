'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTokenVestingSchedule(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Token Vesting Schedule"
      subtitle="Manages token vesting schedules with time-based releases"
      accent="orange"
      ctaLabel="Create Schedule"
      payloadPrefix="TOKEN_VESTING"
      fields={[
        {
          key: 'scheduleId',
          label: 'Schedule Identifier',
          type: 'text',
          placeholder: 'schedule-001',
          required: true,
        },
        {
          key: 'tokenAddress',
          label: 'Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'beneficiary',
          label: 'Beneficiary Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'vestingType',
          label: 'Vesting Type',
          type: 'select',
          options: [
            { label: 'Linear', value: 'linear' },
            { label: 'Cliff', value: 'cliff' },
            { label: 'Staged', value: 'staged' },
          ],
          required: true,
        },
        {
          key: 'vestingDuration',
          label: 'Vesting Duration (days)',
          type: 'number',
          placeholder: '365',
          required: true,
        },
        {
          key: 'schedulePolicy',
          label: 'Schedule Policy',
          type: 'textarea',
          placeholder: 'Vesting schedule rules and duration parameters',
        },
      ]}
    />
  )
}

