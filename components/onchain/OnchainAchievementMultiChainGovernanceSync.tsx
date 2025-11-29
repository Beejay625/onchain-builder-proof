'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiChainGovernanceSync(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Chain Governance Sync"
      subtitle="Synchronizes governance across chains"
      accent="teal"
      ctaLabel="Configure Sync"
      payloadPrefix="MULTICHAIN_GOV_SYNC"
      fields={[
        {
          key: 'syncId',
          label: 'Sync Identifier',
          type: 'text',
          placeholder: 'sync-001',
          required: true,
        },
        {
          key: 'governanceChains',
          label: 'Governance Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'syncMode',
          label: 'Sync Mode',
          type: 'select',
          options: [
            { label: 'Bidirectional', value: 'bidirectional' },
            { label: 'Unidirectional', value: 'unidirectional' },
            { label: 'Selective', value: 'selective' },
          ],
          required: true,
        },
        {
          key: 'syncFrequency',
          label: 'Sync Frequency (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'syncPolicy',
          label: 'Sync Policy',
          type: 'textarea',
          placeholder: 'Governance sync rules and frequency parameters',
        },
      ]}
    />
  )
}

