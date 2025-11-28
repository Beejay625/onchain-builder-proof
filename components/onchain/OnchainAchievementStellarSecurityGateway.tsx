'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarSecurityGateway(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Security Gateway"
      subtitle="Security gateway for stellar network access"
      accent="red"
      ctaLabel="Deploy Gateway"
      payloadPrefix="STELLAR_SEC_GW"
      fields={[
        {
          key: 'gatewayId',
          label: 'Gateway Identifier',
          type: 'text',
          placeholder: 'gateway-001',
          required: true,
        },
        {
          key: 'accessPolicy',
          label: 'Access Policy',
          type: 'select',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Restricted', value: 'restricted' },
            { label: 'Whitelist', value: 'whitelist' },
            { label: 'Permissioned', value: 'permissioned' },
          ],
          required: true,
        },
        {
          key: 'allowedAddresses',
          label: 'Allowed Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
        },
        {
          key: 'gatewayPolicy',
          label: 'Gateway Policy',
          type: 'textarea',
          placeholder: 'Security gateway rules and access parameters',
        },
      ]}
    />
  )
}

