'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCredentialBurnVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Credential Burn Vault"
      subtitle="Burn hazardous credentials"
      accent="stone"
      ctaLabel="Seal Burn Vault"
      payloadPrefix="CREDENTIAL_BURN"
      fields={[
        {
          key: 'credential',
          label: 'Credential',
          type: 'text',
          placeholder: 'treasury-signer',
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
          key: 'burnWindow',
          label: 'Burn Window',
          type: 'text',
          placeholder: '2025-01-20T00:00Z',
          required: true,
        },
        {
          key: 'justification',
          label: 'Justification',
          type: 'textarea',
          placeholder: 'Rotating after incident',
          required: true,
        },
      ]}
    />
  )
}
