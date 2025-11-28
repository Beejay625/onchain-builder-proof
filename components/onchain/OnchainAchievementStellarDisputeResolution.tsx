'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarDisputeResolution(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Dispute Resolution"
      subtitle="Dispute resolution system for stellar operations"
      accent="rose"
      ctaLabel="Initiate Resolution"
      payloadPrefix="STELLAR_DISPUTE"
      fields={[
        {
          key: 'disputeId',
          label: 'Dispute Identifier',
          type: 'text',
          placeholder: 'dispute-001',
          required: true,
        },
        {
          key: 'disputeType',
          label: 'Dispute Type',
          type: 'select',
          options: [
            { label: 'Contractual', value: 'contractual' },
            { label: 'Technical', value: 'technical' },
            { label: 'Governance', value: 'governance' },
            { label: 'Operational', value: 'operational' },
          ],
          required: true,
        },
        {
          key: 'resolutionMechanism',
          label: 'Resolution Mechanism',
          type: 'select',
          options: [
            { label: 'Arbitration', value: 'arbitration' },
            { label: 'Mediation', value: 'mediation' },
            { label: 'Voting', value: 'voting' },
          ],
          required: true,
        },
        {
          key: 'disputeDetails',
          label: 'Dispute Details',
          type: 'textarea',
          placeholder: 'Dispute description and evidence',
        },
      ]}
    />
  )
}

