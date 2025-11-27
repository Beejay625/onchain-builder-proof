'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossMeshStateSync(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Mesh State Sync"
      subtitle="Synchronize state across multiple mesh networks"
      accent="blue"
      ctaLabel="Configure Sync"
      payloadPrefix="CROSS_MESH_SYNC"
      fields={[
        {
          key: 'syncId',
          label: 'Sync Identifier',
          type: 'text',
          placeholder: 'sync-001',
          required: true,
        },
        {
          key: 'sourceMesh',
          label: 'Source Mesh ID',
          type: 'text',
          placeholder: 'mesh-001',
          required: true,
        },
        {
          key: 'targetMeshes',
          label: 'Target Mesh IDs',
          type: 'textarea',
          placeholder: 'mesh-002,mesh-003',
          required: true,
        },
        {
          key: 'syncMode',
          label: 'Sync Mode',
          type: 'select',
          options: [
            { label: 'Bidirectional', value: 'bidirectional' },
            { label: 'Unidirectional', value: 'unidirectional' },
            { label: 'Selective', value: 'selective' },
          ],
          required: true,
        },
        {
          key: 'syncFrequency',
          label: 'Sync Frequency (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'conflictResolution',
          label: 'Conflict Resolution Strategy',
          type: 'select',
          options: [
            { label: 'Last-Write-Wins', value: 'lww' },
            { label: 'Timestamp-Based', value: 'timestamp' },
            { label: 'Consensus-Based', value: 'consensus' },
          ],
          required: true,
        },
      ]}
    />
  )
}

