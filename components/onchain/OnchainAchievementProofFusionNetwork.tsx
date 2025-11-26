'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementProofFusionNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Proof Fusion Network"
      subtitle="Network for fusing proofs across domains"
      accent="pink"
      ctaLabel="Join Fusion Network"
      payloadPrefix="PROOF_FUSION"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'proof-fusion-net-001',
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
          key: 'participantChains',
          label: 'Participant Chains',
          type: 'textarea',
          placeholder: 'ethereum,arbitrum,optimism,polygon',
          required: true,
        },
        {
          key: 'consensusMechanism',
          label: 'Consensus Mechanism',
          type: 'select',
          options: [
            { label: 'Quorum', value: 'quorum' },
            { label: 'Threshold', value: 'threshold' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'fusionProofHash',
          label: 'Fusion Proof Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Network rules and participation requirements',
        },
      ]}
    />
  )
}

