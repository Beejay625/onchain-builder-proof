'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMerkleTreeValidator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Merkle Tree Validator"
      subtitle="Validates Merkle tree proofs for data integrity verification"
      accent="green"
      ctaLabel="Deploy Validator"
      payloadPrefix="MERKLE_TREE_VALIDATOR"
      fields={[
        {
          key: 'validatorId',
          label: 'Validator Identifier',
          type: 'text',
          placeholder: 'validator-001',
          required: true,
        },
        {
          key: 'treeType',
          label: 'Tree Type',
          type: 'select',
          options: [
            { label: 'Binary', value: 'binary' },
            { label: 'Sparse', value: 'sparse' },
            { label: 'Patricia', value: 'patricia' },
          ],
          required: true,
        },
        {
          key: 'hashFunction',
          label: 'Hash Function',
          type: 'select',
          options: [
            { label: 'SHA256', value: 'sha256' },
            { label: 'Keccak256', value: 'keccak256' },
            { label: 'Blake2b', value: 'blake2b' },
          ],
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
          key: 'validatorPolicy',
          label: 'Validator Policy',
          type: 'textarea',
          placeholder: 'Merkle tree validator rules and tree parameters',
        },
      ]}
    />
  )
}

