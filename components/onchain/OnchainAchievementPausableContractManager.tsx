'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPausableContractManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Pausable Contract Manager"
      subtitle="Manages pausable contracts with emergency stop functionality"
      accent="amber"
      ctaLabel="Deploy Manager"
      payloadPrefix="PAUSABLE_CONTRACT"
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
          key: 'pauseType',
          label: 'Pause Type',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Selective', value: 'selective' },
            { label: 'Tiered', value: 'tiered' },
          ],
          required: true,
        },
        {
          key: 'pauseAuthority',
          label: 'Pause Authority',
          type: 'select',
          options: [
            { label: 'Owner', value: 'owner' },
            { label: 'Multi-Sig', value: 'multisig' },
            { label: 'Governance', value: 'governance' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Pausable contract rules and authority parameters',
        },
      ]}
    />
  )
}

