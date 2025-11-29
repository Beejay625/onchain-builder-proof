'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementYieldFarmingVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Yield Farming Vault"
      subtitle="Automated yield farming vault with strategy management"
      accent="emerald"
      ctaLabel="Create Vault"
      payloadPrefix="YIELD_FARMING_VAULT"
      fields={[
        {
          key: 'vaultId',
          label: 'Vault Identifier',
          type: 'text',
          placeholder: 'vault-001',
          required: true,
        },
        {
          key: 'depositToken',
          label: 'Deposit Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'strategyType',
          label: 'Strategy Type',
          type: 'select',
          options: [
            { label: 'Liquidity Provision', value: 'liquidity' },
            { label: 'Lending', value: 'lending' },
            { label: 'Staking', value: 'staking' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'performanceFee',
          label: 'Performance Fee (%)',
          type: 'number',
          placeholder: '20',
          required: true,
        },
        {
          key: 'vaultPolicy',
          label: 'Vault Policy',
          type: 'textarea',
          placeholder: 'Yield farming vault rules and strategy parameters',
        },
      ]}
    />
  )
}

