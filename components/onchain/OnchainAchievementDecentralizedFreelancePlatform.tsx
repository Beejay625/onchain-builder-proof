'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedFreelancePlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Freelance Platform"
      subtitle="Freelance platform with escrow payments and reputation system"
      accent="indigo"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_FREELANCE"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'escrowModel',
          label: 'Escrow Model',
          type: 'select',
          options: [
            { label: 'Full Escrow', value: 'full' },
            { label: 'Partial Escrow', value: 'partial' },
            { label: 'Milestone-Based', value: 'milestone' },
          ],
          required: true,
        },
        {
          key: 'disputeResolution',
          label: 'Dispute Resolution',
          type: 'select',
          options: [
            { label: 'Arbitration', value: 'arbitration' },
            { label: 'Voting', value: 'voting' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Freelance platform rules and escrow parameters',
        },
      ]}
    />
  )
}

