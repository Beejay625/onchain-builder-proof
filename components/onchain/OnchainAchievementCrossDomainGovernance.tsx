'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossDomainGovernance(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Domain Governance"
      subtitle="Governance across multiple domains"
      accent="teal"
      ctaLabel="Propose Governance"
      payloadPrefix="XDOMAIN_GOV"
      fields={[
        {
          key: 'proposalId',
          label: 'Proposal Identifier',
          type: 'text',
          placeholder: 'prop-001',
          required: true,
        },
        {
          key: 'proposalType',
          label: 'Proposal Type',
          type: 'select',
          options: [
            { label: 'Parameter Change', value: 'parameter' },
            { label: 'Upgrade', value: 'upgrade' },
            { label: 'Treasury', value: 'treasury' },
            { label: 'Emergency', value: 'emergency' },
          ],
          required: true,
        },
        {
          key: 'affectedDomains',
          label: 'Affected Domains',
          type: 'textarea',
          placeholder: 'ethereum,arbitrum,optimism',
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
          key: 'quorumRequirement',
          label: 'Quorum Requirement (%)',
          type: 'number',
          placeholder: '20',
          required: true,
        },
        {
          key: 'proposalHash',
          label: 'Proposal Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'description',
          label: 'Proposal Description',
          type: 'textarea',
          placeholder: 'Detailed proposal description and rationale',
        },
      ]}
    />
  )
}

