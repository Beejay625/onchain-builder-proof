'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAccountAbstractionManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Account Abstraction Manager"
      subtitle="Manages ERC-4337 account abstraction with smart contract wallets"
      accent="blue"
      ctaLabel="Deploy Manager"
      payloadPrefix="ACCOUNT_ABSTRACTION"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'walletType',
          label: 'Wallet Type',
          type: 'select',
          options: [
            { label: 'Simple', value: 'simple' },
            { label: 'Multi-Sig', value: 'multisig' },
            { label: 'Social Recovery', value: 'social_recovery' },
          ],
          required: true,
        },
        {
          key: 'paymasterAddress',
          label: 'Paymaster Address',
          type: 'text',
          placeholder: '0x...',
        },
        {
          key: 'bundlerAddress',
          label: 'Bundler Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Account abstraction rules and wallet parameters',
        },
      ]}
    />
  )
}

