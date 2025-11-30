'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementERC4337EntryPointManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="ERC-4337 Entry Point Manager"
      subtitle="Manages ERC-4337 entry point for account abstraction"
      accent="violet"
      ctaLabel="Deploy Manager"
      payloadPrefix="ERC4337_ENTRYPOINT"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'entryPointVersion',
          label: 'Entry Point Version',
          type: 'select',
          options: [
            { label: 'v0.6', value: 'v0.6' },
            { label: 'v0.7', value: 'v0.7' },
            { label: 'Latest', value: 'latest' },
          ],
          required: true,
        },
        {
          key: 'maxOpsPerBundle',
          label: 'Max Operations per Bundle',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'stakeAmount',
          label: 'Stake Amount',
          type: 'text',
          placeholder: '1000000000000000000',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Entry point rules and bundle parameters',
        },
      ]}
    />
  )
}

