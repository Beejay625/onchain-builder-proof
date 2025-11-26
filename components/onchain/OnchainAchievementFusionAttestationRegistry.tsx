'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionAttestationRegistry(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Attestation Registry"
      subtitle="Registry for fusion attestations"
      accent="rose"
      ctaLabel="Register Attestation"
      payloadPrefix="FUSION_ATTEST"
      fields={[
        {
          key: 'attestationId',
          label: 'Attestation Identifier',
          type: 'text',
          placeholder: 'attest-001',
          required: true,
        },
        {
          key: 'attestorAddress',
          label: 'Attestor Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'attestationType',
          label: 'Attestation Type',
          type: 'select',
          options: [
            { label: 'Fusion', value: 'fusion' },
            { label: 'Cross-Domain', value: 'cross_domain' },
            { label: 'Sovereign', value: 'sovereign' },
            { label: 'Quantum', value: 'quantum' },
          ],
          required: true,
        },
        {
          key: 'subjectHash',
          label: 'Subject Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'expiryTimestamp',
          label: 'Expiry Timestamp',
          type: 'number',
          placeholder: '1735689600',
          required: true,
        },
        {
          key: 'revocationPolicy',
          label: 'Revocation Policy',
          type: 'textarea',
          placeholder: 'Revocation conditions and procedures',
        },
      ]}
    />
  )
}

