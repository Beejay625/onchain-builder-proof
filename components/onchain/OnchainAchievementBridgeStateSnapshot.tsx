'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeStateSnapshot(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge State Snapshot"
      subtitle="Snapshots bridge state for recovery"
      accent="cyan"
      ctaLabel="Create Snapshot"
      payloadPrefix="BRIDGE_STATE_SNAPSHOT"
      fields={[
        {
          key: 'snapshotId',
          label: 'Snapshot Identifier',
          type: 'text',
          placeholder: 'snapshot-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'snapshotType',
          label: 'Snapshot Type',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Incremental', value: 'incremental' },
            { label: 'Differential', value: 'differential' },
          ],
          required: true,
        },
        {
          key: 'retentionPeriod',
          label: 'Retention Period (days)',
          type: 'number',
          placeholder: '30',
          required: true,
        },
        {
          key: 'snapshotPolicy',
          label: 'Snapshot Policy',
          type: 'textarea',
          placeholder: 'State snapshot rules and retention parameters',
        },
      ]}
    />
  )
}

