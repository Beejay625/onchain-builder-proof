'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIncidentEvidenceRelay(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Incident Evidence Relay"
      subtitle="Route forensic bundles"
      accent="yellow"
      ctaLabel="Relay Evidence"
      payloadPrefix="EVIDENCE_RELAY"
      fields={[
        {
        key: 'channel',
        label: 'Storage Channel',
        type: 'select',
        options: [
        { label: 'IPFS', value: 'ipfs' },
        { label: 'Arweave', value: 'arweave' },
        { label: 'S3', value: 's3' },
        ],
        required: true,
        },
        {
        key: 'cid',
        label: 'Evidence CID',
        type: 'text',
        placeholder: 'bafy...',
        required: true,
        },
        {
        key: 'verifier',
        label: 'Verifier',
        type: 'text',
        placeholder: 'guardian-audit',
        required: true,
        },
        {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Context or filters',
        },
      ]}
    />
  )
}
