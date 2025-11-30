'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDelegationManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Delegation Manager"
      subtitle="Manages token delegation for staking and governance"
      accent="emerald"
      ctaLabel="Configure Delegation"
      payloadPrefix="DELEGATION_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'delegationType',
          label: 'Delegation Type',
          type: 'select',
          options: [
            { label: 'Staking', value: 'staking' },
            { label: 'Governance', value: 'governance' },
            { label: 'Both', value: 'both' },
          ],
          required: true,
        },
        {
          key: 'delegationLock',
          label: 'Delegation Lock Period (blocks)',
          type: 'number',
          placeholder: '0',
          required: true,
        },
        {
          key: 'maxDelegations',
          label: 'Max Delegations per Address',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Delegation rules and lock parameters',
        },
      ]}
    />
  )
}

