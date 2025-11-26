'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementForensicSnapshotBeacon(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Forensic Snapshot Beacon"
      subtitle="Pin deterministic forensic captures"
      accent="cyan"
      ctaLabel="Emit Snapshot Beacon"
      payloadPrefix="FORENSIC_BEACON"
      fields={[
        {
        key: 'blockHeight',
        label: 'Block Height',
        type: 'number',
        placeholder: '123456',
        required: true,
        },
        {
        key: 'cid',
        label: 'Snapshot CID',
        type: 'text',
        placeholder: 'bafy...',
        required: true,
        },
        {
        key: 'investigator',
        label: 'Investigator',
        type: 'text',
        placeholder: 'forensics@ops',
        required: true,
        },
        {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'What the snapshot covers',
        },
      ]}
    />
  )
}
