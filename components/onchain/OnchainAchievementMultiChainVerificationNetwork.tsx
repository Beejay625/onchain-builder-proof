'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiChainVerificationNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Chain Verification Network"
      subtitle="Verifies proofs across multiple chains with consensus"
      accent="purple"
      ctaLabel="Deploy Network"
      payloadPrefix="MULTICHAIN_VERIFY_NET"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'targetChains',
          label: 'Target Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'consensusType',
          label: 'Consensus Type',
          type: 'select',
          options: [
            { label: 'Quorum', value: 'quorum' },
            { label: 'Threshold', value: 'threshold' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'verificationThreshold',
          label: 'Verification Threshold (%)',
          type: 'number',
          placeholder: '67',
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Verification network rules and consensus parameters',
        },
      ]}
    />
  )
}

