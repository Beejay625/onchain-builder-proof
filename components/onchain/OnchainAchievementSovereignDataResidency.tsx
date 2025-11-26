'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignDataResidency(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Data Residency"
      subtitle="Manage data residency requirements"
      accent="green"
      ctaLabel="Set Residency Policy"
      payloadPrefix="SOV_RESIDENCY"
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
          key: 'restrictedRegions',
          label: 'Restricted Regions',
          type: 'textarea',
          placeholder: 'CN,RU',
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
          key: 'residencyProof',
          label: 'Residency Proof Hash',
          type: 'text',
          placeholder: '0x...',
        },
      ]}
    />
  )
}

