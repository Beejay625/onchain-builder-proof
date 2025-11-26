'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementHazmatCredentialLocker(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Hazmat Credential Locker"
      subtitle="Seal high-risk credentials"
      accent="stone"
      ctaLabel="Lock Credentials"
      payloadPrefix="HAZMAT_LOCKER"
      fields=[
      {
              key: 'vaultSlot',
              label: 'Vault Slot',
              type: 'text',
              placeholder: 'slot-7',
              required: true,
            },
      {
              key: 'scope',
              label: 'Scope',
              type: 'text',
              placeholder: 'treasury signer',
              required: true,
            },
      {
              key: 'expiry',
              label: 'Expiry',
              type: 'text',
              placeholder: '2025-01-12T00:00Z',
              required: true,
            },
      {
              key: 'owner',
              label: 'Owner',
              type: 'text',
              placeholder: 'guardian.ops',
              required: true,
            },
      {
              key: 'notes',
              label: 'Notes',
              type: 'textarea',
              placeholder: 'Prereqs to unlock',
            },
    ]
    />
  )
}
