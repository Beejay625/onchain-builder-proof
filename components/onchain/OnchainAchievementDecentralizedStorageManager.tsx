'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedStorageManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Storage Manager"
      subtitle="Manages decentralized storage with IPFS and Arweave integration"
      accent="cyan"
      ctaLabel="Deploy Manager"
      payloadPrefix="DECENTRALIZED_STORAGE"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'storageProtocol',
          label: 'Storage Protocol',
          type: 'select',
          options: [
            { label: 'IPFS', value: 'ipfs' },
            { label: 'Arweave', value: 'arweave' },
            { label: 'Filecoin', value: 'filecoin' },
            { label: 'Multi-Protocol', value: 'multi' },
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
          key: 'retentionPeriod',
          label: 'Retention Period (days)',
          type: 'number',
          placeholder: '365',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Storage manager rules and replication parameters',
        },
      ]}
    />
  )
}

