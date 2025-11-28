'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherDataResidency(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Data Residency"
      subtitle="Data residency management for aether networks"
      accent="green"
      ctaLabel="Set Residency Policy"
      payloadPrefix="AETHER_DATA_RESIDENCY"
      fields={[
        {
          key: 'policyId',
          label: 'Policy Identifier',
          type: 'text',
          placeholder: 'policy-001',
          required: true,
        },
        {
          key: 'dataType',
          label: 'Data Type',
          type: 'select',
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Financial', value: 'financial' },
            { label: 'Operational', value: 'operational' },
            { label: 'Public', value: 'public' },
          ],
          required: true,
        },
        {
          key: 'allowedRegions',
          label: 'Allowed Regions',
          type: 'textarea',
          placeholder: 'EU,US,APAC',
          required: true,
        },
        {
          key: 'enforcementMode',
          label: 'Enforcement Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Advisory', value: 'advisory' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'policyRules',
          label: 'Policy Rules',
          type: 'textarea',
          placeholder: 'Data residency rules and region parameters',
        },
      ]}
    />
  )
}

