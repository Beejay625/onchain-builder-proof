'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshGovernanceCouncil(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Governance Council"
      subtitle="Governance council for mesh network operations"
      accent="teal"
      ctaLabel="Form Council"
      payloadPrefix="MESH_GOV"
      fields={[
        {
          key: 'councilId',
          label: 'Council Identifier',
          type: 'text',
          placeholder: 'council-001',
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
          key: 'memberCount',
          label: 'Member Count',
          type: 'number',
          placeholder: '7',
          required: true,
        },
        {
          key: 'quorumThreshold',
          label: 'Quorum Threshold (%)',
          type: 'number',
          placeholder: '67',
          required: true,
        },
        {
          key: 'votingPeriod',
          label: 'Voting Period (days)',
          type: 'number',
          placeholder: '7',
          required: true,
        },
        {
          key: 'governanceScope',
          label: 'Governance Scope',
          type: 'textarea',
          placeholder: 'Areas of governance authority',
        },
      ]}
    />
  )
}

