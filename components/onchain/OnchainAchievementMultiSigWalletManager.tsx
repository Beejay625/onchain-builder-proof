'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiSigWalletManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Sig Wallet Manager"
      subtitle="Manages multi-signature wallets with configurable thresholds"
      accent="purple"
      ctaLabel="Create Wallet"
      payloadPrefix="MULTISIG_WALLET"
      fields={[
        {
          key: 'walletId',
          label: 'Wallet Identifier',
          type: 'text',
          placeholder: 'wallet-001',
          required: true,
        },
        {
          key: 'ownerAddresses',
          label: 'Owner Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
          required: true,
        },
        {
          key: 'threshold',
          label: 'Signature Threshold',
          type: 'number',
          placeholder: '2',
          required: true,
        },
        {
          key: 'walletType',
          label: 'Wallet Type',
          type: 'select',
          options: [
            { label: 'Gnosis Safe', value: 'gnosis_safe' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'walletPolicy',
          label: 'Wallet Policy',
          type: 'textarea',
          placeholder: 'Multi-sig wallet rules and threshold parameters',
        },
      ]}
    />
  )
}

