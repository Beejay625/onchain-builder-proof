'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiChainAccountManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Chain Account Manager"
      subtitle="Manages accounts across multiple blockchain networks"
      accent="indigo"
      ctaLabel="Deploy Manager"
      payloadPrefix="MULTICHAIN_ACCOUNT"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'supportedChains',
          label: 'Supported Chains',
          type: 'textarea',
          placeholder: 'ethereum,polygon,arbitrum,optimism',
          required: true,
        },
        {
          key: 'accountType',
          label: 'Account Type',
          type: 'select',
          options: [
            { label: 'EOA', value: 'eoa' },
            { label: 'Smart Contract', value: 'smart_contract' },
            { label: 'Account Abstraction', value: 'account_abstraction' },
          ],
          required: true,
        },
        {
          key: 'syncMethod',
          label: 'Sync Method',
          type: 'select',
          options: [
            { label: 'Manual', value: 'manual' },
            { label: 'Automatic', value: 'automatic' },
            { label: 'On-Demand', value: 'on_demand' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Multi-chain account rules and sync parameters',
        },
      ]}
    />
  )
}

