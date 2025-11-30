'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementEIP4844BlobManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="EIP-4844 Blob Manager"
      subtitle="Manages EIP-4844 blob transactions for data availability"
      accent="violet"
      ctaLabel="Deploy Manager"
      payloadPrefix="EIP4844_BLOB_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'blobSize',
          label: 'Blob Size (bytes)',
          type: 'number',
          placeholder: '131072',
          required: true,
        },
        {
          key: 'maxBlobsPerBlock',
          label: 'Max Blobs per Block',
          type: 'number',
          placeholder: '6',
          required: true,
        },
        {
          key: 'retentionPeriod',
          label: 'Retention Period (blocks)',
          type: 'number',
          placeholder: '4096',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Blob manager rules and retention parameters',
        },
      ]}
    />
  )
}

