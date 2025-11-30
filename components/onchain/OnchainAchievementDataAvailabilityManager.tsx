'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDataAvailabilityManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Data Availability Manager"
      subtitle="Manages data availability for rollups and state channels"
      accent="blue"
      ctaLabel="Deploy Manager"
      payloadPrefix="DATA_AVAILABILITY"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'storageType',
          label: 'Storage Type',
          type: 'select',
          options: [
            { label: 'On-Chain', value: 'on_chain' },
            { label: 'Off-Chain', value: 'off_chain' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'replicationFactor',
          label: 'Replication Factor',
          type: 'number',
          placeholder: '3',
          required: true,
        },
        {
          key: 'availabilityGuarantee',
          label: 'Availability Guarantee (%)',
          type: 'number',
          placeholder: '99.9',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Data availability rules and replication parameters',
        },
      ]}
    />
  )
}

