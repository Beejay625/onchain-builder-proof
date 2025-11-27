'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignDisputeResolution(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Dispute Resolution"
      subtitle="Dispute resolution system for sovereign operations"
      accent="rose"
      ctaLabel="Initiate Resolution"
      payloadPrefix="SOV_DISPUTE"
      fields={[
        {
          key: 'disputeId',
          label: 'Dispute Identifier',
          type: 'text',
          placeholder: 'dispute-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2',
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
            { label: 'Sovereignty', value: 'sovereignty' },
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

