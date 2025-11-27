'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshDataResidency(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Data Residency"
      subtitle="Manage data residency requirements for mesh networks"
      accent="green"
      ctaLabel="Set Residency Policy"
      payloadPrefix="MESH_RESIDENCY"
      fields={[
        {
          key: 'policyId',
          label: 'Policy Identifier',
          type: 'text',
          placeholder: 'policy-001',
          required: true,
        },
        {
          key: 'meshId',
          label: 'Mesh Network ID',
          type: 'text',
          placeholder: 'mesh-001',
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
      ]}
    />
  )
}

