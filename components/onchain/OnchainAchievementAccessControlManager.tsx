'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAccessControlManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Access Control Manager"
      subtitle="Manages role-based access control for contracts"
      accent="slate"
      ctaLabel="Configure Access"
      payloadPrefix="ACCESS_CONTROL_MGR"
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
          key: 'roleTypes',
          label: 'Role Types',
          type: 'textarea',
          placeholder: 'admin,minter,burner,pauser',
          required: true,
        },
        {
          key: 'defaultRole',
          label: 'Default Role',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Viewer', value: 'viewer' },
            { label: 'User', value: 'user' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Access control rules and role parameters',
        },
      ]}
    />
  )
}

