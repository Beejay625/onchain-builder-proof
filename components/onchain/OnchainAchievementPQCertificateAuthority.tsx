'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPQCertificateAuthority(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="PQ Certificate Authority"
      subtitle="Certificate authority using post-quantum crypto"
      accent="blue"
      ctaLabel="Deploy CA"
      payloadPrefix="PQ_CA"
      fields={[
        {
          key: 'caId',
          label: 'CA Identifier',
          type: 'text',
          placeholder: 'ca-001',
          required: true,
        },
        {
          key: 'signatureScheme',
          label: 'Signature Scheme',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'validityPeriod',
          label: 'Validity Period (days)',
          type: 'number',
          placeholder: '365',
          required: true,
        },
        {
          key: 'caPolicy',
          label: 'CA Policy',
          type: 'textarea',
          placeholder: 'Certificate authority rules and validity parameters',
        },
      ]}
    />
  )
}

