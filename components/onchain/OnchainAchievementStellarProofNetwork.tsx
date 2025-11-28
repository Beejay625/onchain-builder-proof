'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarProofNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Proof Network"
      subtitle="Network for stellar proof operations"
      accent="purple"
      ctaLabel="Join Network"
      payloadPrefix="STELLAR_PROOF_NET"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
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
          key: 'consensusModel',
          label: 'Consensus Model',
          type: 'select',
          options: [
            { label: 'Quorum', value: 'quorum' },
            { label: 'Threshold', value: 'threshold' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Proof network rules and consensus parameters',
        },
      ]}
    />
  )
}

