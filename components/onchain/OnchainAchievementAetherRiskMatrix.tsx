'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherRiskMatrix(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Risk Matrix"
      subtitle="Risk assessment matrix for aether networks"
      accent="red"
      ctaLabel="Assess Risk"
      payloadPrefix="AETHER_RISK"
      fields={[
        {
          key: 'assessmentId',
          label: 'Assessment Identifier',
          type: 'text',
          placeholder: 'risk-001',
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
          key: 'likelihood',
          label: 'Likelihood',
          type: 'select',
          options: [
            { label: 'Rare', value: 'rare' },
            { label: 'Unlikely', value: 'unlikely' },
            { label: 'Possible', value: 'possible' },
            { label: 'Likely', value: 'likely' },
            { label: 'Almost Certain', value: 'almost_certain' },
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

