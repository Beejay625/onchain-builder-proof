'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarAttestationHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Attestation Hub"
      subtitle="Hub for stellar attestation operations"
      accent="violet"
      ctaLabel="Deploy Hub"
      payloadPrefix="STELLAR_ATTEST_HUB"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'attestationTypes',
          label: 'Attestation Types',
          type: 'textarea',
          placeholder: 'identity,credential,proof,compliance',
          required: true,
        },
        {
          key: 'hubAddress',
          label: 'Hub Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'hubPolicy',
          label: 'Hub Policy',
          type: 'textarea',
          placeholder: 'Attestation hub rules and type parameters',
        },
      ]}
    />
  )
}

