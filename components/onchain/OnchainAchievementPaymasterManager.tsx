'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPaymasterManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Paymaster Manager"
      subtitle="Manages paymasters for gasless transactions in account abstraction"
      accent="green"
      ctaLabel="Deploy Paymaster"
      payloadPrefix="PAYMASTER_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'sponsorshipType',
          label: 'Sponsorship Type',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Partial', value: 'partial' },
            { label: 'Conditional', value: 'conditional' },
          ],
          required: true,
        },
        {
          key: 'maxGasSponsored',
          label: 'Max Gas Sponsored',
          type: 'number',
          placeholder: '100000',
          required: true,
        },
        {
          key: 'whitelistRequired',
          label: 'Whitelist Required',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Paymaster rules and sponsorship parameters',
        },
      ]}
    />
  )
}

