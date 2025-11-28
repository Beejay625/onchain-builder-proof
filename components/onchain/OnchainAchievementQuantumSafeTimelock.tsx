'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSafeTimelock(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Safe Timelock"
      subtitle="Timelock contracts with post-quantum security"
      accent="purple"
      ctaLabel="Create Timelock"
      payloadPrefix="QSAFE_TIMELOCK"
      fields={[
        {
          key: 'timelockId',
          label: 'Timelock Identifier',
          type: 'text',
          placeholder: 'timelock-001',
          required: true,
        },
        {
          key: 'lockDuration',
          label: 'Lock Duration (seconds)',
          type: 'number',
          placeholder: '604800',
          required: true,
        },
        {
          key: 'releaseMechanism',
          label: 'Release Mechanism',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Condition-Based', value: 'condition_based' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'timelockPolicy',
          label: 'Timelock Policy',
          type: 'textarea',
          placeholder: 'Timelock rules and release parameters',
        },
      ]}
    />
  )
}

