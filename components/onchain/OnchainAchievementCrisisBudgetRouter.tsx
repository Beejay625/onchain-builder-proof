'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrisisBudgetRouter(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Crisis Budget Router"
      subtitle="Pre-approve emergency spend"
      accent="teal"
      ctaLabel="Route Budget"
      payloadPrefix="CRISIS_BUDGET"
      fields={[
        {
        key: 'token',
        label: 'Token',
        type: 'select',
        options: [
        { label: 'USDC', value: 'USDC' },
        { label: 'ETH', value: 'ETH' },
        { label: 'OP', value: 'OP' },
        ],
        required: true,
        },
        {
        key: 'cap',
        label: 'Cap',
        type: 'number',
        placeholder: '10000',
        required: true,
        },
        {
        key: 'squad',
        label: 'Squad',
        type: 'text',
        placeholder: 'treasury-core',
        required: true,
        },
        {
        key: 'reviewer',
        label: 'Reviewer',
        type: 'text',
        placeholder: 'guardian.eth',
        required: true,
        },
        {
        key: 'reason',
        label: 'Reason',
        type: 'textarea',
        placeholder: 'How funds will be used',
        required: true,
        },
      ]}
    />
  )
}
