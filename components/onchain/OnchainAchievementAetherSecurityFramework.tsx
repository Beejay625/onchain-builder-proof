'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherSecurityFramework(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Security Framework"
      subtitle="Security framework for aether network operations"
      accent="red"
      ctaLabel="Deploy Framework"
      payloadPrefix="AETHER_SECURITY"
      fields={[
        {
          key: 'frameworkId',
          label: 'Framework Identifier',
          type: 'text',
          placeholder: 'framework-001',
          required: true,
        },
        {
          key: 'securityLayers',
          label: 'Security Layers',
          type: 'textarea',
          placeholder: 'network,application,data,identity',
          required: true,
        },
        {
          key: 'threatModel',
          label: 'Threat Model',
          type: 'select',
          options: [
            { label: 'STRIDE', value: 'stride' },
            { label: 'DREAD', value: 'dread' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'securityLevel',
          label: 'Security Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'frameworkPolicy',
          label: 'Framework Policy',
          type: 'textarea',
          placeholder: 'Security framework rules and threat mitigation parameters',
        },
      ]}
    />
  )
}

