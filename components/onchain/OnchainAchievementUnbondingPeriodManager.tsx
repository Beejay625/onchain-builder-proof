'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementUnbondingPeriodManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Unbonding Period Manager"
      subtitle="Manages unbonding periods for staking withdrawals"
      accent="slate"
      ctaLabel="Configure Period"
      payloadPrefix="UNBONDING_PERIOD"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'unbondingPeriod',
          label: 'Unbonding Period (blocks)',
          type: 'number',
          placeholder: '10000',
          required: true,
        },
        {
          key: 'earlyWithdrawalPenalty',
          label: 'Early Withdrawal Penalty (%)',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'withdrawalType',
          label: 'Withdrawal Type',
          type: 'select',
          options: [
            { label: 'Immediate', value: 'immediate' },
            { label: 'Delayed', value: 'delayed' },
            { label: 'Gradual', value: 'gradual' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Unbonding period rules and penalty parameters',
        },
      ]}
    />
  )
}

