'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementForensicAnchorBeacon(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Forensic Anchor Beacon"
      subtitle="Pin forensic captures"
      accent="cyan"
      ctaLabel="Emit Anchor Beacon"
      payloadPrefix="ANCHOR_BEACON"
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
