'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusContinuityMatrix(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Continuity Matrix"
      subtitle="Matrix for tracking continuity across nexus networks"
      accent="emerald"
      ctaLabel="Create Matrix"
      payloadPrefix="NEXUS_CONTINUITY_MATRIX"
      fields={[
        {
          key: 'matrixId',
          label: 'Matrix Identifier',
          type: 'text',
          placeholder: 'matrix-001',
          required: true,
        },
        {
          key: 'nexusNetworks',
          label: 'Nexus Networks',
          type: 'textarea',
          placeholder: 'nexus1,nexus2,nexus3',
          required: true,
        },
        {
          key: 'continuityDimensions',
          label: 'Continuity Dimensions',
          type: 'textarea',
          placeholder: 'state,execution,data,identity,sovereignty',
          required: true,
        },
        {
          key: 'measurementInterval',
          label: 'Measurement Interval (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'thresholdPolicy',
          label: 'Threshold Policy',
          type: 'textarea',
          placeholder: 'Continuity thresholds and alert rules',
        },
      ]}
    />
  )
}

