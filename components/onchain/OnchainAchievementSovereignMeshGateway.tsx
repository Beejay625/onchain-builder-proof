'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignMeshGateway(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Mesh Gateway"
      subtitle="Gateway for sovereign mesh network access"
      accent="green"
      ctaLabel="Deploy Gateway"
      payloadPrefix="SOV_GATEWAY"
      fields={[
        {
          key: 'gatewayId',
          label: 'Gateway Identifier',
          type: 'text',
          placeholder: 'gateway-001',
          required: true,
        },
        {
          key: 'meshId',
          label: 'Mesh Network ID',
          type: 'text',
          placeholder: 'mesh-001',
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
          key: 'encryptionRequired',
          label: 'Encryption Required',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Optional', value: 'optional' },
          ],
          required: true,
        },
        {
          key: 'gatewayPolicy',
          label: 'Gateway Policy',
          type: 'textarea',
          placeholder: 'Gateway rules and access controls',
        },
      ]}
    />
  )
}

