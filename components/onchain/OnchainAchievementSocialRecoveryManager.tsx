'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSocialRecoveryManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Social Recovery Manager"
      subtitle="Manages social recovery for wallet account recovery"
      accent="rose"
      ctaLabel="Configure Recovery"
      payloadPrefix="SOCIAL_RECOVERY"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'guardianCount',
          label: 'Guardian Count',
          type: 'number',
          placeholder: '5',
          required: true,
        },
        {
          key: 'recoveryThreshold',
          label: 'Recovery Threshold',
          type: 'number',
          placeholder: '3',
          required: true,
        },
        {
          key: 'recoveryDelay',
          label: 'Recovery Delay (blocks)',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Social recovery rules and threshold parameters',
        },
      ]}
    />
  )
}

