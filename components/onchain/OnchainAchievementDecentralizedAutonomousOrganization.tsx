'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedAutonomousOrganization(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Autonomous Organization"
      subtitle="Manages DAO with governance, treasury, and voting"
      accent="indigo"
      ctaLabel="Create DAO"
      payloadPrefix="DAO_ORG"
      fields={[
        {
          key: 'daoId',
          label: 'DAO Identifier',
          type: 'text',
          placeholder: 'dao-001',
          required: true,
        },
        {
          key: 'governanceToken',
          label: 'Governance Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'votingMechanism',
          label: 'Voting Mechanism',
          type: 'select',
          options: [
            { label: 'One-Token-One-Vote', value: 'one_token_one_vote' },
            { label: 'Quadratic', value: 'quadratic' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'quorumThreshold',
          label: 'Quorum Threshold (%)',
          type: 'number',
          placeholder: '4',
          required: true,
        },
        {
          key: 'daoPolicy',
          label: 'DAO Policy',
          type: 'textarea',
          placeholder: 'DAO rules and governance parameters',
        },
      ]}
    />
  )
}

