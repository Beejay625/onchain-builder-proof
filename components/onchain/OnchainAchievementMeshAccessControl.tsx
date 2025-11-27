'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshAccessControl(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Access Control"
      subtitle="Access control for mesh network resources"
      accent="slate"
      ctaLabel="Configure Access"
      payloadPrefix="MESH_ACCESS"
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
          key: 'resourceType',
          label: 'Resource Type',
          type: 'select',
          options: [
            { label: 'Node', value: 'node' },
            { label: 'Gateway', value: 'gateway' },
            { label: 'Treasury', value: 'treasury' },
            { label: 'Governance', value: 'governance' },
          ],
          required: true,
        },
        {
          key: 'accessLevel',
          label: 'Access Level',
          type: 'select',
          options: [
            { label: 'Read', value: 'read' },
            { label: 'Write', value: 'write' },
            { label: 'Execute', value: 'execute' },
            { label: 'Admin', value: 'admin' },
          ],
          required: true,
        },
        {
          key: 'authorizedEntities',
          label: 'Authorized Entities',
          type: 'textarea',
          placeholder: 'address1,address2,address3',
          required: true,
        },
        {
          key: 'enforcementMode',
          label: 'Enforcement Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Advisory', value: 'advisory' },
          ],
          required: true,
        },
      ]}
    />
  )
}

