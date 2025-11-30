'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementWalletConnectManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="WalletConnect Manager"
      subtitle="Manages WalletConnect integration for wallet connections"
      accent="teal"
      ctaLabel="Configure Integration"
      payloadPrefix="WALLETCONNECT_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'projectId',
          label: 'Project ID',
          type: 'text',
          placeholder: 'your-project-id',
          required: true,
        },
        {
          key: 'supportedChains',
          label: 'Supported Chains',
          type: 'textarea',
          placeholder: '1,137,42161,10',
          required: true,
        },
        {
          key: 'connectionMode',
          label: 'Connection Mode',
          type: 'select',
          options: [
            { label: 'QR Code', value: 'qr' },
            { label: 'Deep Link', value: 'deep_link' },
            { label: 'Both', value: 'both' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'WalletConnect integration rules and connection parameters',
        },
      ]}
    />
  )
}

