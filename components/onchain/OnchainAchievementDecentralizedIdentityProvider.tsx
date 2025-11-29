'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedIdentityProvider(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Identity Provider"
      subtitle="Provides decentralized identity with DID and verifiable credentials"
      accent="green"
      ctaLabel="Deploy Provider"
      payloadPrefix="DID_PROVIDER"
      fields={[
        {
          key: 'providerId',
          label: 'Provider Identifier',
          type: 'text',
          placeholder: 'provider-001',
          required: true,
        },
        {
          key: 'identityStandard',
          label: 'Identity Standard',
          type: 'select',
          options: [
            { label: 'DID', value: 'did' },
            { label: 'Verifiable Credentials', value: 'vc' },
            { label: 'Soulbound Tokens', value: 'sbt' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'attestationMethod',
          label: 'Attestation Method',
          type: 'select',
          options: [
            { label: 'Self-Attestation', value: 'self' },
            { label: 'Third-Party', value: 'third_party' },
            { label: 'Multi-Party', value: 'multi_party' },
          ],
          required: true,
        },
        {
          key: 'providerPolicy',
          label: 'Provider Policy',
          type: 'textarea',
          placeholder: 'Identity provider rules and attestation parameters',
        },
      ]}
    />
  )
}

