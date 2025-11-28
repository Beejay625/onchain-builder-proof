'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarGovernanceAssembly(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Governance Assembly"
      subtitle="Governance assembly for stellar operations"
      accent="teal"
      ctaLabel="Form Assembly"
      payloadPrefix="STELLAR_GOV_ASSEMBLY"
      fields={[
        {
          key: 'assemblyId',
          label: 'Assembly Identifier',
          type: 'text',
          placeholder: 'assembly-001',
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
          key: 'votingMechanism',
          label: 'Voting Mechanism',
          type: 'select',
          options: [
            { label: 'One-Vote-Per-Member', value: 'one_per_member' },
            { label: 'Weighted', value: 'weighted' },
            { label: 'Quadratic', value: 'quadratic' },
          ],
          required: true,
        },
        {
          key: 'assemblyPolicy',
          label: 'Assembly Policy',
          type: 'textarea',
          placeholder: 'Governance assembly rules and voting parameters',
        },
      ]}
    />
  )
}

