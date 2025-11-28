'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostQuantumMerkleTrees(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Quantum Merkle Trees"
      subtitle="Merkle trees using post-quantum hash functions"
      accent="green"
      ctaLabel="Create Tree"
      payloadPrefix="PQ_MERKLE"
      fields={[
        {
          key: 'treeId',
          label: 'Tree Identifier',
          type: 'text',
          placeholder: 'tree-001',
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
          key: 'treeStructure',
          label: 'Tree Structure',
          type: 'select',
          options: [
            { label: 'Binary', value: 'binary' },
            { label: 'Ternary', value: 'ternary' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'rootHash',
          label: 'Root Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'treePolicy',
          label: 'Tree Policy',
          type: 'textarea',
          placeholder: 'Merkle tree rules and structure parameters',
        },
      ]}
    />
  )
}

