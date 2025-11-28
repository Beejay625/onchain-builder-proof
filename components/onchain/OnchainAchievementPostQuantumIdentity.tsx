'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostQuantumIdentity(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Quantum Identity"
      subtitle="Identity management with post-quantum crypto"
      accent="purple"
      ctaLabel="Create Identity"
      payloadPrefix="PQ_IDENTITY"
      fields={[
        {
          key: 'identityId',
          label: 'Identity Identifier',
          type: 'text',
          placeholder: 'identity-001',
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
          key: 'attestationTracking',
          label: 'Attestation Tracking',
          type: 'textarea',
          placeholder: 'Attestation rules and tracking parameters',
        },
        {
          key: 'identityPolicy',
          label: 'Identity Policy',
          type: 'textarea',
          placeholder: 'Identity management rules and signature parameters',
        },
      ]}
    />
  )
}

