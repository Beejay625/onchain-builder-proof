'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusComplianceFramework(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Compliance Framework"
      subtitle="Compliance framework for nexus network operations"
      accent="amber"
      ctaLabel="Deploy Framework"
      payloadPrefix="NEXUS_COMPLIANCE"
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
          key: 'complianceStandards',
          label: 'Compliance Standards',
          type: 'textarea',
          placeholder: 'GDPR,CCPA,HIPAA,SOC2',
          required: true,
        },
        {
          key: 'jurisdictions',
          label: 'Jurisdictions',
          type: 'textarea',
          placeholder: 'EU,US,UK,APAC',
          required: true,
        },
        {
          key: 'enforcementLevel',
          label: 'Enforcement Level',
          type: 'select',
          options: [
            { label: 'Mandatory', value: 'mandatory' },
            { label: 'Recommended', value: 'recommended' },
            { label: 'Advisory', value: 'advisory' },
          ],
          required: true,
        },
        {
          key: 'frameworkRules',
          label: 'Framework Rules',
          type: 'textarea',
          placeholder: 'Compliance rules and validation criteria',
        },
      ]}
    />
  )
}

