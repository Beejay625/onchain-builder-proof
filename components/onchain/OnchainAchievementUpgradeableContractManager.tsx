'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementUpgradeableContractManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Upgradeable Contract Manager"
      subtitle="Manages upgradeable smart contracts with governance"
      accent="indigo"
      ctaLabel="Deploy Manager"
      payloadPrefix="UPGRADEABLE_CONTRACT"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'contractAddress',
          label: 'Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'upgradeType',
          label: 'Upgrade Type',
          type: 'select',
          options: [
            { label: 'Proxy', value: 'proxy' },
            { label: 'Diamond', value: 'diamond' },
            { label: 'Beacon', value: 'beacon' },
          ],
          required: true,
        },
        {
          key: 'governanceRequired',
          label: 'Governance Required',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Optional', value: 'optional' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Upgradeable contract rules and governance parameters',
        },
      ]}
    />
  )
}

