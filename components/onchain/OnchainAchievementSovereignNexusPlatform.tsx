'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignNexusPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Nexus Platform"
      subtitle="Platform for sovereign nexus operations"
      accent="purple"
      ctaLabel="Deploy Platform"
      payloadPrefix="SOV_NEXUS_PLATFORM"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'platformServices',
          label: 'Platform Services',
          type: 'textarea',
          placeholder: 'governance,treasury,identity,attestation,settlement',
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
          placeholder: 'Platform rules and sovereignty governance',
        },
      ]}
    />
  )
}

