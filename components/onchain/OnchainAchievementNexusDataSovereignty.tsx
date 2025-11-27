'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusDataSovereignty(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Data Sovereignty"
      subtitle="Manage data sovereignty across nexus networks"
      accent="emerald"
      ctaLabel="Set Sovereignty Policy"
      payloadPrefix="NEXUS_DATA_SOV"
      fields={[
        {
          key: 'policyId',
          label: 'Policy Identifier',
          type: 'text',
          placeholder: 'policy-001',
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
          key: 'dataType',
          label: 'Data Type',
          type: 'select',
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Financial', value: 'financial' },
            { label: 'Operational', value: 'operational' },
            { label: 'Sovereign', value: 'sovereign' },
          ],
          required: true,
        },
        {
          key: 'sovereigntyRules',
          label: 'Sovereignty Rules',
          type: 'textarea',
          placeholder: 'Data sovereignty rules and restrictions',
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
      ]}
    />
  )
}

