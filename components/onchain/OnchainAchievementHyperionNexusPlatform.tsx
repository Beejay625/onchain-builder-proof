'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementHyperionNexusPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Hyperion Nexus Platform"
      subtitle="Platform for hyperion nexus operations"
      accent="purple"
      ctaLabel="Deploy Platform"
      payloadPrefix="HYPERION_NEXUS_PLATFORM"
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
          placeholder: 'orchestration,coordination,automation,optimization',
          required: true,
        },
        {
          key: 'platformType',
          label: 'Platform Type',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'intelligenceLevel',
          label: 'Intelligence Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
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
          placeholder: 'Platform rules and intelligence parameters',
        },
      ]}
    />
  )
}

