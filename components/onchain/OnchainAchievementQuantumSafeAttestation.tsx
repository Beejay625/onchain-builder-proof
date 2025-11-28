'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSafeAttestation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Safe Attestation"
      subtitle="Attestations using quantum-resistant proofs"
      accent="purple"
      ctaLabel="Create Attestation"
      payloadPrefix="QSAFE_ATTEST"
      fields={[
        {
          key: 'attestationId',
          label: 'Attestation Identifier',
          type: 'text',
          placeholder: 'attest-001',
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
          key: 'attestationType',
          label: 'Attestation Type',
          type: 'select',
          options: [
            { label: 'Identity', value: 'identity' },
            { label: 'Credential', value: 'credential' },
            { label: 'Proof', value: 'proof' },
          ],
          required: true,
        },
        {
          key: 'attestationPolicy',
          label: 'Attestation Policy',
          type: 'textarea',
          placeholder: 'Attestation rules and validity parameters',
        },
      ]}
    />
  )
}

