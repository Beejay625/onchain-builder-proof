'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSessionKeyManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Session Key Manager"
      subtitle="Manages session keys for temporary transaction authorization"
      accent="amber"
      ctaLabel="Configure Keys"
      payloadPrefix="SESSION_KEY_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'sessionDuration',
          label: 'Session Duration (blocks)',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'maxSpendLimit',
          label: 'Max Spend Limit',
          type: 'text',
          placeholder: '1000000',
          required: true,
        },
        {
          key: 'allowedContracts',
          label: 'Allowed Contracts',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Session key rules and duration parameters',
        },
      ]}
    />
  )
}

