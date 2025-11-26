'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionSecurityAudit(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Security Audit"
      subtitle="Security audit for fusion operations"
      accent="red"
      ctaLabel="Submit Audit"
      payloadPrefix="FUSION_AUDIT"
      fields={[
        {
          key: 'auditId',
          label: 'Audit Identifier',
          type: 'text',
          placeholder: 'audit-001',
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
          placeholder: 'Fusion components and domains',
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
          key: 'auditReportHash',
          label: 'Audit Report Hash',
          type: 'text',
          placeholder: '0x...',
        },
        {
          key: 'remediationPlan',
          label: 'Remediation Plan',
          type: 'textarea',
          placeholder: 'Remediation steps and timeline',
        },
      ]}
    />
  )
}

