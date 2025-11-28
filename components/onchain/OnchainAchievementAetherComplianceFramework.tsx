'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherComplianceFramework(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Compliance Framework"
      subtitle="Compliance framework for aether operations"
      accent="amber"
      ctaLabel="Deploy Framework"
      payloadPrefix="AETHER_COMPLIANCE"
      fields={[
        {
          key: 'frameworkId',
          label: 'Framework Identifier',
          type: 'text',
          placeholder: 'framework-001',
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
          key: 'frameworkPolicy',
          label: 'Framework Policy',
          type: 'textarea',
          placeholder: 'Compliance framework rules and jurisdiction parameters',
        },
      ]}
    />
  )
}

