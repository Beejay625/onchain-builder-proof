'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGuardianFusionCouncil(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Guardian Fusion Council"
      subtitle="Fuse guardian councils across domains"
      accent="red"
      ctaLabel="Fuse Council"
      payloadPrefix="GUARDIAN_FUSION"
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
          key: 'domainScope',
          label: 'Domain Scope',
          type: 'textarea',
          placeholder: 'ethereum,arbitrum,optimism',
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
          key: 'rotationPolicy',
          label: 'Rotation Policy',
          type: 'textarea',
          placeholder: 'Rotation cadence and eligibility rules',
        },
      ]}
    />
  )
}

