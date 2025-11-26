'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementProofShelterBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Proof Shelter Bridge"
      subtitle="Pause sensitive proofs"
      accent="slate"
      ctaLabel="Update Proof Shelter"
      payloadPrefix="PROOF_SHELTER"
      fields=[
      {
              key: 'bundleId',
              label: 'Bundle ID',
              type: 'text',
              placeholder: 'bundle-23',
              required: true,
            },
      {
              key: 'state',
              label: 'Shelter State',
              type: 'select',
              options: [
          { label: 'Sealed', value: 'sealed' },
          { label: 'Released', value: 'released' },
        ],
              required: true,
            },
      {
              key: 'criteria',
              label: 'Release Criteria',
              type: 'textarea',
              placeholder: 'Need quorum + audit',
              required: true,
            },
      {
              key: 'watcher',
              label: 'Watcher',
              type: 'text',
              placeholder: 'guardian.watch',
              required: true,
            },
    ]
    />
  )
}
