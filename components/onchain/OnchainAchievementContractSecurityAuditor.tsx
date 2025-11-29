'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementContractSecurityAuditor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Contract Security Auditor"
      subtitle="Automated security auditing for smart contracts"
      accent="red"
      ctaLabel="Run Audit"
      payloadPrefix="CONTRACT_SECURITY_AUDIT"
      fields={[
        {
          key: 'auditorId',
          label: 'Auditor Identifier',
          type: 'text',
          placeholder: 'auditor-001',
          required: true,
        },
        {
          key: 'contractAddress',
          label: 'Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'auditType',
          label: 'Audit Type',
          type: 'select',
          options: [
            { label: 'Static Analysis', value: 'static' },
            { label: 'Dynamic Analysis', value: 'dynamic' },
            { label: 'Formal Verification', value: 'formal' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'severityLevel',
          label: 'Severity Level',
          type: 'select',
          options: [
            { label: 'Critical', value: 'critical' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'auditorPolicy',
          label: 'Auditor Policy',
          type: 'textarea',
          placeholder: 'Security audit rules and severity parameters',
        },
      ]}
    />
  )
}

