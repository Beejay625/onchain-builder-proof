'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveFailureRecovery(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Failure Recovery"
      subtitle="Recovery system with adaptive strategies"
      accent="rose"
      ctaLabel="Configure Recovery"
      payloadPrefix="ADAPTIVE_RECOVERY"
      fields={[
        {
          key: 'recoveryId',
          label: 'Recovery Identifier',
          type: 'text',
          placeholder: 'recovery-001',
          required: true,
        },
        {
          key: 'protectedSystems',
          label: 'Protected Systems',
          type: 'textarea',
          placeholder: 'system1,system2,system3',
          required: true,
        },
        {
          key: 'recoveryStrategy',
          label: 'Recovery Strategy',
          type: 'select',
          options: [
            { label: 'Automatic', value: 'automatic' },
            { label: 'Semi-Automatic', value: 'semi_automatic' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'recoveryTime',
          label: 'Target Recovery Time (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'recoveryPolicy',
          label: 'Recovery Policy',
          type: 'textarea',
          placeholder: 'Recovery rules and failure handling parameters',
        },
      ]}
    />
  )
}

