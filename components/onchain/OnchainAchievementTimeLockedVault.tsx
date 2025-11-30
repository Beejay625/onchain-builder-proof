'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTimeLockedVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Time-Locked Vault"
      subtitle="Vault with time-based locks for delayed withdrawals"
      accent="amber"
      ctaLabel="Create Vault"
      payloadPrefix="TIMELOCK_VAULT"
      fields={[
        {
          key: 'vaultId',
          label: 'Vault Identifier',
          type: 'text',
          placeholder: 'vault-001',
          required: true,
        },
        {
          key: 'assetType',
          label: 'Asset Type',
          type: 'select',
          options: [
            { label: 'ETH', value: 'eth' },
            { label: 'ERC20', value: 'erc20' },
            { label: 'ERC721', value: 'erc721' },
          ],
          required: true,
        },
        {
          key: 'lockDuration',
          label: 'Lock Duration (blocks)',
          type: 'number',
          placeholder: '17280',
          required: true,
        },
        {
          key: 'releaseMechanism',
          label: 'Release Mechanism',
          type: 'select',
          options: [
            { label: 'Automatic', value: 'automatic' },
            { label: 'Manual', value: 'manual' },
            { label: 'Conditional', value: 'conditional' },
          ],
          required: true,
        },
        {
          key: 'vaultPolicy',
          label: 'Vault Policy',
          type: 'textarea',
          placeholder: 'Time-locked vault rules and release parameters',
        },
      ]}
    />
  )
}

