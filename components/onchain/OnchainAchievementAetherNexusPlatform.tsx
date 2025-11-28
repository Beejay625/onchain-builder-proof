'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherNexusPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Nexus Platform"
      subtitle="Platform for aether nexus operations"
      accent="purple"
      ctaLabel="Deploy Platform"
      payloadPrefix="AETHER_NEXUS_PLATFORM"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'platformServices',
          label: 'Platform Services',
          type: 'textarea',
          placeholder: 'orchestration,governance,treasury,identity,attestation',
          required: true,
        },
        {
          key: 'platformType',
          label: 'Platform Type',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
            { label: 'Consortium', value: 'consortium' },
          ],
          required: true,
        },
        {
          key: 'platformAddress',
          label: 'Platform Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Platform rules and service coordination parameters',
        },
      ]}
    />
  )
}

