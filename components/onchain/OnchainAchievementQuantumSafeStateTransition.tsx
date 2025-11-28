'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSafeStateTransition(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Safe State Transition"
      subtitle="State transitions with post-quantum verification"
      accent="indigo"
      ctaLabel="Create Transition"
      payloadPrefix="QSAFE_STATE_TRANS"
      fields={[
        {
          key: 'transitionId',
          label: 'Transition Identifier',
          type: 'text',
          placeholder: 'trans-001',
          required: true,
        },
        {
          key: 'transitionProof',
          label: 'Transition Proof Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'rollbackSupport',
          label: 'Rollback Support',
          type: 'select',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' },
          ],
          required: true,
        },
        {
          key: 'transitionPolicy',
          label: 'Transition Policy',
          type: 'textarea',
          placeholder: 'State transition rules and rollback parameters',
        },
      ]}
    />
  )
}

