'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementProofRefugeBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Proof Refuge Bridge"
      subtitle="Shelter sensitive proofs"
      accent="slate"
      ctaLabel="Update Refuge Bridge"
      payloadPrefix="REFUGE_BRIDGE"
      fields={[
        {
          key: 'bundleId',
          label: 'Bundle ID',
          type: 'text',
          placeholder: 'bundle-23',
          required: true,
        },
        {
          key: 'bridgeState',
          label: 'Bridge State',
          type: 'select',
          options: [
            { label: 'Sealed', value: 'sealed' },
            { label: 'Released', value: 'released' },
          ],
          required: true,
        },
        {
          key: 'releaseGuard',
          label: 'Release Guard',
          type: 'textarea',
          placeholder: 'Conditions to exit shelter',
          required: true,
        },
        {
          key: 'watcher',
          label: 'Watcher',
          type: 'text',
          placeholder: 'guardian.watch',
          required: true,
        },
      ]}
    />
  )
}
