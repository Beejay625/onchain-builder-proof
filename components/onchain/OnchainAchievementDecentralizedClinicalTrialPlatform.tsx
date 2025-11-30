'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedClinicalTrialPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Clinical Trial Platform"
      subtitle="Platform for managing clinical trials with transparent data sharing"
      accent="red"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_CLINICAL_TRIAL"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'trialPhase',
          label: 'Trial Phase',
          type: 'select',
          options: [
            { label: 'Phase I', value: 'phase_1' },
            { label: 'Phase II', value: 'phase_2' },
            { label: 'Phase III', value: 'phase_3' },
            { label: 'Phase IV', value: 'phase_4' },
          ],
          required: true,
        },
        {
          key: 'dataSharing',
          label: 'Data Sharing',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Restricted', value: 'restricted' },
            { label: 'Consortium', value: 'consortium' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Clinical trial platform rules and data sharing parameters',
        },
      ]}
    />
  )
}

