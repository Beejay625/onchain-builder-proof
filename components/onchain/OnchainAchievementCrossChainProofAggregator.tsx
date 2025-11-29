'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainProofAggregator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Proof Aggregator"
      subtitle="Aggregates proofs from multiple chains"
      accent="violet"
      ctaLabel="Deploy Aggregator"
      payloadPrefix="XCHAIN_PROOF_AGG"
      fields={[
        {
          key: 'aggregatorId',
          label: 'Aggregator Identifier',
          type: 'text',
          placeholder: 'agg-001',
          required: true,
        },
        {
          key: 'sourceChains',
          label: 'Source Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'proofType',
          label: 'Proof Type',
          type: 'select',
          options: [
            { label: 'Merkle', value: 'merkle' },
            { label: 'ZK-SNARK', value: 'zk_snark' },
            { label: 'ZK-STARK', value: 'zk_stark' },
            { label: 'Fraud Proof', value: 'fraud_proof' },
          ],
          required: true,
        },
        {
          key: 'aggregationMethod',
          label: 'Aggregation Method',
          type: 'select',
          options: [
            { label: 'Batch', value: 'batch' },
            { label: 'Sequential', value: 'sequential' },
            { label: 'Tree-Based', value: 'tree_based' },
          ],
          required: true,
        },
        {
          key: 'aggregatorPolicy',
          label: 'Aggregator Policy',
          type: 'textarea',
          placeholder: 'Proof aggregation rules and method parameters',
        },
      ]}
    />
  )
}

