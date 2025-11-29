'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGovernanceProposalSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Governance Proposal System"
      subtitle="Manages governance proposals with voting mechanisms"
      accent="teal"
      ctaLabel="Create Proposal"
      payloadPrefix="GOV_PROPOSAL_SYSTEM"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'proposalType',
          label: 'Proposal Type',
          type: 'select',
          options: [
            { label: 'Parameter Change', value: 'parameter' },
            { label: 'Treasury', value: 'treasury' },
            { label: 'Upgrade', value: 'upgrade' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'votingMechanism',
          label: 'Voting Mechanism',
          type: 'select',
          options: [
            { label: 'One-Vote-Per-Token', value: 'one_per_token' },
            { label: 'Quadratic', value: 'quadratic' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'quorumThreshold',
          label: 'Quorum Threshold (%)',
          type: 'number',
          placeholder: '5',
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'Governance proposal rules and voting parameters',
        },
      ]}
    />
  )
}

