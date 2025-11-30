'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMerkleTreeVerifier(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Merkle Tree Verifier"
      subtitle="Verifies Merkle tree proofs for efficient data integrity checks"
      accent="green"
      ctaLabel="Deploy Verifier"
      payloadPrefix="MERKLE_TREE_VERIFIER"
      fields={[
        {
          key: 'verifierId',
          label: 'Verifier Identifier',
          type: 'text',
          placeholder: 'verifier-001',
          required: true,
        },
        {
          key: 'treeDepth',
          label: 'Tree Depth',
          type: 'number',
          placeholder: '32',
          required: true,
        },
        {
          key: 'hashFunction',
          label: 'Hash Function',
          type: 'select',
          options: [
            { label: 'SHA256', value: 'sha256' },
            { label: 'Keccak256', value: 'keccak256' },
            { label: 'Poseidon', value: 'poseidon' },
          ],
          required: true,
        },
        {
          key: 'leafCount',
          label: 'Leaf Count',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'verifierPolicy',
          label: 'Verifier Policy',
          type: 'textarea',
          placeholder: 'Merkle tree verifier rules and hash parameters',
        },
      ]}
    />
  )
}

