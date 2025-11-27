'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshSecurityAudit(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Security Audit"
      subtitle="Security audit for mesh network operations"
      accent="red"
      ctaLabel="Submit Audit"
      payloadPrefix="MESH_AUDIT"
      fields={[
        {
          key: 'auditId',
          label: 'Audit Identifier',
          type: 'text',
          placeholder: 'audit-001',
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
          key: 'auditorAddress',
          label: 'Auditor Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'auditScope',
          label: 'Audit Scope',
          type: 'textarea',
          placeholder: 'Components and areas audited',
          required: true,
        },
        {
          key: 'auditStatus',
          label: 'Audit Status',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Completed', value: 'completed' },
            { label: 'Failed', value: 'failed' },
          ],
          required: true,
        },
        {
          key: 'findingsCount',
          label: 'Findings Count',
          type: 'number',
          placeholder: '0',
          required: true,
        },
        {
          key: 'reportHash',
          label: 'Audit Report Hash',
          type: 'text',
          placeholder: '0x...',
        },
      ]}
    />
  )
}

