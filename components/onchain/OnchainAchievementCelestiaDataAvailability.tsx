'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCelestiaDataAvailability(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Celestia Data Availability"
      subtitle="Integrates Celestia for off-chain data availability"
      accent="teal"
      ctaLabel="Configure Integration"
      payloadPrefix="CELESTIA_DA"
      fields={[
        {
          key: 'integrationId',
          label: 'Integration Identifier',
          type: 'text',
          placeholder: 'integration-001',
          required: true,
        },
        {
          key: 'namespaceId',
          label: 'Namespace ID',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'shareSize',
          label: 'Share Size (bytes)',
          type: 'number',
          placeholder: '512',
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
          key: 'integrationPolicy',
          label: 'Integration Policy',
          type: 'textarea',
          placeholder: 'Celestia DA rules and replication parameters',
        },
      ]}
    />
  )
}

