'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementValidatorRewardCalculator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Validator Reward Calculator"
      subtitle="Calculates validator rewards based on participation and performance"
      accent="amber"
      ctaLabel="Deploy Calculator"
      payloadPrefix="VALIDATOR_REWARD_CALC"
      fields={[
        {
          key: 'calculatorId',
          label: 'Calculator Identifier',
          type: 'text',
          placeholder: 'calc-001',
          required: true,
        },
        {
          key: 'rewardModel',
          label: 'Reward Model',
          type: 'select',
          options: [
            { label: 'Fixed', value: 'fixed' },
            { label: 'Variable', value: 'variable' },
            { label: 'Inflation-Based', value: 'inflation' },
            { label: 'Fee-Based', value: 'fee' },
          ],
          required: true,
        },
        {
          key: 'performanceWeight',
          label: 'Performance Weight (%)',
          type: 'number',
          placeholder: '50',
          required: true,
        },
        {
          key: 'uptimeWeight',
          label: 'Uptime Weight (%)',
          type: 'number',
          placeholder: '50',
          required: true,
        },
        {
          key: 'calculatorPolicy',
          label: 'Calculator Policy',
          type: 'textarea',
          placeholder: 'Reward calculation rules and weight parameters',
        },
      ]}
    />
  )
}

