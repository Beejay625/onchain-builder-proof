'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementInterChainTrustRegistry(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Inter-Chain Trust Registry"
      subtitle="Registry for trust relationships between chains"
      accent="green"
      ctaLabel="Create Registry"
      payloadPrefix="INTERCHAIN_TRUST_REG"
      fields={[
        {
          key: 'registryId',
          label: 'Registry Identifier',
          type: 'text',
          placeholder: 'registry-001',
          required: true,
        },
        {
          key: 'chainPairs',
          label: 'Chain Pairs',
          type: 'textarea',
          placeholder: 'ethereum-arbitrum,ethereum-optimism,arbitrum-optimism',
          required: true,
        },
        {
          key: 'trustLevel',
          label: 'Trust Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Attestation', value: 'attestation' },
            { label: 'Proof', value: 'proof' },
            { label: 'Consensus', value: 'consensus' },
          ],
          required: true,
        },
        {
          key: 'registryPolicy',
          label: 'Registry Policy',
          type: 'textarea',
          placeholder: 'Trust registry rules and verification parameters',
        },
      ]}
    />
  )
}

