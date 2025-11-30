'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRewardDistributionEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Reward Distribution Engine"
      subtitle="Distributes rewards based on participation and performance"
      accent="yellow"
      ctaLabel="Deploy Engine"
      payloadPrefix="REWARD_DISTRIBUTION"
      fields={[
        {
          key: 'engineId',
          label: 'Engine Identifier',
          type: 'text',
          placeholder: 'engine-001',
          required: true,
        },
        {
          key: 'distributionModel',
          label: 'Distribution Model',
          type: 'select',
          options: [
            { label: 'Proportional', value: 'proportional' },
            { label: 'Equal', value: 'equal' },
            { label: 'Performance-Based', value: 'performance' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'distributionPeriod',
          label: 'Distribution Period (blocks)',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'rewardToken',
          label: 'Reward Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'enginePolicy',
          label: 'Engine Policy',
          type: 'textarea',
          placeholder: 'Reward distribution rules and period parameters',
        },
      ]}
    />
  )
}

