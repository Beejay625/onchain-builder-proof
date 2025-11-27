'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumProofAggregator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Proof Aggregator"
      subtitle="Aggregate quantum-resistant proofs across networks"
      accent="purple"
      ctaLabel="Configure Aggregator"
      payloadPrefix="QPROOF_AGG"
      fields={[
        {
          key: 'aggregatorId',
          label: 'Aggregator Identifier',
          type: 'text',
          placeholder: 'agg-001',
          required: true,
        },
        {
          key: 'proofSources',
          label: 'Proof Source Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
          required: true,
        },
        {
          key: 'aggregationMethod',
          label: 'Aggregation Method',
          type: 'select',
          options: [
            { label: 'Merkle Tree', value: 'merkle' },
            { label: 'ZK-SNARK', value: 'zk_snark' },
            { label: 'ZK-STARK', value: 'zk_stark' },
            { label: 'Hybrid', value: 'hybrid' },
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
          key: 'aggregationWindow',
          label: 'Aggregation Window (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
      ]}
    />
  )
}

