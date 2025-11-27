'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusGovernanceAssembly(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Governance Assembly"
      subtitle="Governance assembly for nexus network operations"
      accent="teal"
      ctaLabel="Form Assembly"
      payloadPrefix="NEXUS_GOV_ASSEMBLY"
      fields={[
        {
          key: 'assemblyId',
          label: 'Assembly Identifier',
          type: 'text',
          placeholder: 'assembly-001',
          required: true,
        },
        {
          key: 'nexusId',
          label: 'Nexus Network ID',
          type: 'text',
          placeholder: 'nexus-001',
          required: true,
        },
        {
          key: 'memberSovereignties',
          label: 'Member Sovereignties',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'votingMechanism',
          label: 'Voting Mechanism',
          type: 'select',
          options: [
            { label: 'One-Vote-Per-Sovereignty', value: 'one_per_sovereignty' },
            { label: 'Weighted', value: 'weighted' },
            { label: 'Quadratic', value: 'quadratic' },
          ],
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
          key: 'governanceScope',
          label: 'Governance Scope',
          type: 'textarea',
          placeholder: 'Areas of governance authority',
        },
      ]}
    />
  )
}

