'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignGuardianCouncil(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Guardian Council"
      subtitle="Guardian council for sovereign operations"
      accent="red"
      ctaLabel="Form Council"
      payloadPrefix="SOV_GUARDIAN_COUNCIL"
      fields={[
        {
          key: 'councilId',
          label: 'Council Identifier',
          type: 'text',
          placeholder: 'council-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
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
          placeholder: 'Guardian council rules and responsibilities',
        },
      ]}
    />
  )
}

