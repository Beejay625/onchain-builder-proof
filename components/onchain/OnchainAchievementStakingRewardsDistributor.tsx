'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStakingRewardsDistributor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Staking Rewards Distributor"
      subtitle="Distributes staking rewards based on participation"
      accent="green"
      ctaLabel="Deploy Distributor"
      payloadPrefix="STAKING_REWARDS"
      fields={[
        {
          key: 'distributorId',
          label: 'Distributor Identifier',
          type: 'text',
          placeholder: 'distributor-001',
          required: true,
        },
        {
          key: 'stakingToken',
          label: 'Staking Token Address',
          type: 'text',
          placeholder: '0x...',
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
          key: 'distributionModel',
          label: 'Distribution Model',
          type: 'select',
          options: [
            { label: 'Proportional', value: 'proportional' },
            { label: 'Fixed', value: 'fixed' },
            { label: 'Tiered', value: 'tiered' },
          ],
          required: true,
        },
        {
          key: 'rewardRate',
          label: 'Reward Rate (per day)',
          type: 'number',
          placeholder: '1.0',
          required: true,
        },
        {
          key: 'distributorPolicy',
          label: 'Distributor Policy',
          type: 'textarea',
          placeholder: 'Rewards distribution rules and rate parameters',
        },
      ]}
    />
  )
}

