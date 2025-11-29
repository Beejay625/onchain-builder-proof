'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeRiskAssessor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Risk Assessor"
      subtitle="Assesses risks in bridge operations"
      accent="red"
      ctaLabel="Assess Risk"
      payloadPrefix="BRIDGE_RISK_ASSESS"
      fields={[
        {
          key: 'assessorId',
          label: 'Assessor Identifier',
          type: 'text',
          placeholder: 'assessor-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'riskCategory',
          label: 'Risk Category',
          type: 'select',
          options: [
            { label: 'Technical', value: 'technical' },
            { label: 'Financial', value: 'financial' },
            { label: 'Operational', value: 'operational' },
            { label: 'Security', value: 'security' },
          ],
          required: true,
        },
        {
          key: 'severity',
          label: 'Severity',
          type: 'select',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
            { label: 'Critical', value: 'critical' },
          ],
          required: true,
        },
        {
          key: 'mitigationStrategy',
          label: 'Mitigation Strategy',
          type: 'textarea',
          placeholder: 'Risk mitigation steps and controls',
        },
      ]}
    />
  )
}

