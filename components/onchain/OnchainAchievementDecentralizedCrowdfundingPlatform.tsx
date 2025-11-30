'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedCrowdfundingPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Crowdfunding Platform"
      subtitle="Crowdfunding platform with milestone-based releases"
      accent="emerald"
      ctaLabel="Create Campaign"
      payloadPrefix="DECENTRALIZED_CROWDFUND"
      fields={[
        {
          key: 'campaignId',
          label: 'Campaign Identifier',
          type: 'text',
          placeholder: 'campaign-001',
          required: true,
        },
        {
          key: 'fundingGoal',
          label: 'Funding Goal',
          type: 'text',
          placeholder: '1000000000000000000000',
          required: true,
        },
        {
          key: 'fundingModel',
          label: 'Funding Model',
          type: 'select',
          options: [
            { label: 'All-or-Nothing', value: 'all_or_nothing' },
            { label: 'Flexible', value: 'flexible' },
            { label: 'Milestone-Based', value: 'milestone' },
          ],
          required: true,
        },
        {
          key: 'campaignDuration',
          label: 'Campaign Duration (blocks)',
          type: 'number',
          placeholder: '259200',
          required: true,
        },
        {
          key: 'campaignPolicy',
          label: 'Campaign Policy',
          type: 'textarea',
          placeholder: 'Crowdfunding platform rules and duration parameters',
        },
      ]}
    />
  )
}

