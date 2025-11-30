'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGaslessTransactionManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Gasless Transaction Manager"
      subtitle="Enables gasless transactions through account abstraction"
      accent="blue"
      ctaLabel="Deploy Manager"
      payloadPrefix="GASLESS_TX_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'sponsorType',
          label: 'Sponsor Type',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Partial', value: 'partial' },
            { label: 'Conditional', value: 'conditional' },
          ],
          required: true,
        },
        {
          key: 'maxGasPerTx',
          label: 'Max Gas per Transaction',
          type: 'number',
          placeholder: '100000',
          required: true,
        },
        {
          key: 'dailyLimit',
          label: 'Daily Limit',
          type: 'text',
          placeholder: '10000000',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Gasless transaction rules and limit parameters',
        },
      ]}
    />
  )
}

