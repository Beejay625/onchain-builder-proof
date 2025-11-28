'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSafeHashChain(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Safe Hash Chain"
      subtitle="Hash chains with post-quantum algorithms"
      accent="emerald"
      ctaLabel="Create Chain"
      payloadPrefix="QSAFE_HASH_CHAIN"
      fields={[
        {
          key: 'chainId',
          label: 'Chain Identifier',
          type: 'text',
          placeholder: 'chain-001',
          required: true,
        },
        {
          key: 'hashAlgorithm',
          label: 'Hash Algorithm',
          type: 'select',
          options: [
            { label: 'SHA-3', value: 'sha3' },
            { label: 'BLAKE3', value: 'blake3' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'chainLength',
          label: 'Chain Length',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'integrityVerification',
          label: 'Integrity Verification',
          type: 'select',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' },
          ],
          required: true,
        },
        {
          key: 'chainPolicy',
          label: 'Chain Policy',
          type: 'textarea',
          placeholder: 'Hash chain rules and integrity parameters',
        },
      ]}
    />
  )
}

