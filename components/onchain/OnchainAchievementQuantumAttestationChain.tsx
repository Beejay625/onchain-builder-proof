'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumAttestationChain(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Attestation Chain"
      subtitle="Chain of quantum-resistant attestations"
      accent="violet"
      ctaLabel="Create Chain"
      payloadPrefix="QATTEST_CHAIN"
      fields={[
        {
          key: 'chainId',
          label: 'Chain Identifier',
          type: 'text',
          placeholder: 'chain-001',
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
            { label: 'Compliance', value: 'compliance' },
          ],
          required: true,
        },
        {
          key: 'quantumAlgorithm',
          label: 'Quantum Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
          ],
          required: true,
        },
        {
          key: 'chainDepth',
          label: 'Chain Depth',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'revocationPolicy',
          label: 'Revocation Policy',
          type: 'select',
          options: [
            { label: 'Immediate', value: 'immediate' },
            { label: 'Delayed', value: 'delayed' },
            { label: 'Time-Based', value: 'time_based' },
          ],
          required: true,
        },
      ]}
    />
  )
}

