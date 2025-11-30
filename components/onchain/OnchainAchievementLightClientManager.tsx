'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementLightClientManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Light Client Manager"
      subtitle="Manages light clients for cross-chain verification"
      accent="purple"
      ctaLabel="Deploy Manager"
      payloadPrefix="LIGHT_CLIENT_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'sourceChain',
          label: 'Source Chain',
          type: 'text',
          placeholder: 'ethereum-mainnet',
          required: true,
        },
        {
          key: 'clientType',
          label: 'Client Type',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Light', value: 'light' },
            { label: 'Ultra-Light', value: 'ultra_light' },
          ],
          required: true,
        },
        {
          key: 'syncInterval',
          label: 'Sync Interval (blocks)',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Light client rules and sync parameters',
        },
      ]}
    />
  )
}

