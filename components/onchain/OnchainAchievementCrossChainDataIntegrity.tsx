'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainDataIntegrity(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Data Integrity"
      subtitle="Ensures data integrity across chains"
      accent="indigo"
      ctaLabel="Deploy Integrity System"
      payloadPrefix="XCHAIN_DATA_INTEGRITY"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'monitoredChains',
          label: 'Monitored Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'integrityMethod',
          label: 'Integrity Method',
          type: 'select',
          options: [
            { label: 'Hash-Based', value: 'hash_based' },
            { label: 'Merkle Tree', value: 'merkle_tree' },
            { label: 'ZK Proof', value: 'zk_proof' },
          ],
          required: true,
        },
        {
          key: 'verificationFrequency',
          label: 'Verification Frequency (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'Data integrity rules and verification parameters',
        },
      ]}
    />
  )
}

