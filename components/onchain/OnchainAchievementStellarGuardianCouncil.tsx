'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarGuardianCouncil(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Guardian Council"
      subtitle="Guardian council for stellar operations"
      accent="red"
      ctaLabel="Form Council"
      payloadPrefix="STELLAR_GUARDIAN_COUNCIL"
      fields={[
        {
          key: 'councilId',
          label: 'Council Identifier',
          type: 'text',
          placeholder: 'council-001',
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
          key: 'authorityLevel',
          label: 'Authority Level',
          type: 'select',
          options: [
            { label: 'Advisory', value: 'advisory' },
            { label: 'Operational', value: 'operational' },
            { label: 'Emergency', value: 'emergency' },
            { label: 'Sovereign', value: 'sovereign' },
          ],
          required: true,
        },
        {
          key: 'councilPolicy',
          label: 'Council Policy',
          type: 'textarea',
          placeholder: 'Guardian council rules and authority parameters',
        },
      ]}
    />
  )
}

