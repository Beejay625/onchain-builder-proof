'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainTimelock(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Timelock"
      subtitle="Timelock for cross-chain operations"
      accent="purple"
      ctaLabel="Create Timelock"
      payloadPrefix="XCHAIN_TIMELOCK"
      fields={[
        {
          key: 'timelockId',
          label: 'Timelock Identifier',
          type: 'text',
          placeholder: 'timelock-001',
          required: true,
        },
        {
          key: 'affectedChains',
          label: 'Affected Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'lockDuration',
          label: 'Lock Duration (seconds)',
          type: 'number',
          placeholder: '604800',
          required: true,
        },
        {
          key: 'releaseMechanism',
          label: 'Release Mechanism',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Condition-Based', value: 'condition_based' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'timelockPolicy',
          label: 'Timelock Policy',
          type: 'textarea',
          placeholder: 'Timelock rules and release parameters',
        },
      ]}
    />
  )
}

