'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshRiskMatrix(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Risk Matrix"
      subtitle="Risk assessment matrix for mesh networks"
      accent="red"
      ctaLabel="Assess Risk"
      payloadPrefix="MESH_RISK"
      fields={[
        {
          key: 'assessmentId',
          label: 'Assessment Identifier',
          type: 'text',
          placeholder: 'risk-001',
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

