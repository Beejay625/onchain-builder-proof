'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusSecurityFramework(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Security Framework"
      subtitle="Security framework for nexus network operations"
      accent="red"
      ctaLabel="Deploy Framework"
      payloadPrefix="NEXUS_SECURITY"
      fields={[
        {
          key: 'frameworkId',
          label: 'Framework Identifier',
          type: 'text',
          placeholder: 'framework-001',
          required: true,
        },
        {
          key: 'nexusId',
          label: 'Nexus Network ID',
          type: 'text',
          placeholder: 'nexus-001',
          required: true,
        },
        {
          key: 'securityLayers',
          label: 'Security Layers',
          type: 'textarea',
          placeholder: 'network,application,data,sovereignty',
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
          placeholder: 'Security rules and threat mitigation strategies',
        },
      ]}
    />
  )
}

