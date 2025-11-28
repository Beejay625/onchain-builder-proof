'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumProofAnchor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Proof Anchor"
      subtitle="Anchor proofs with post-quantum hash functions"
      accent="violet"
      ctaLabel="Create Anchor"
      payloadPrefix="QPROOF_ANCHOR"
      fields={[
        {
          key: 'anchorId',
          label: 'Anchor Identifier',
          type: 'text',
          placeholder: 'anchor-001',
          required: true,
        },
        {
          key: 'hashFunction',
          label: 'Hash Function',
          type: 'select',
          options: [
            { label: 'SHA-3', value: 'sha3' },
            { label: 'BLAKE3', value: 'blake3' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'chainReference',
          label: 'Chain Reference',
          type: 'text',
          placeholder: 'ethereum-mainnet',
          required: true,
        },
        {
          key: 'blockAnchor',
          label: 'Block Anchor',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'anchorPolicy',
          label: 'Anchor Policy',
          type: 'textarea',
          placeholder: 'Proof anchor rules and chain parameters',
        },
      ]}
    />
  )
}

