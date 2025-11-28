'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherIdentityMesh(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Identity Mesh"
      subtitle="Identity mesh for aether network operations"
      accent="indigo"
      ctaLabel="Deploy Mesh"
      payloadPrefix="AETHER_ID_MESH"
      fields={[
        {
          key: 'meshId',
          label: 'Mesh Identifier',
          type: 'text',
          placeholder: 'mesh-001',
          required: true,
        },
        {
          key: 'identityProviders',
          label: 'Identity Providers',
          type: 'textarea',
          placeholder: 'provider1,provider2,provider3',
          required: true,
        },
        {
          key: 'meshTopology',
          label: 'Mesh Topology',
          type: 'select',
          options: [
            { label: 'Mesh', value: 'mesh' },
            { label: 'Star', value: 'star' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'meshPolicy',
          label: 'Mesh Policy',
          type: 'textarea',
          placeholder: 'Identity mesh rules and provider coordination',
        },
      ]}
    />
  )
}

