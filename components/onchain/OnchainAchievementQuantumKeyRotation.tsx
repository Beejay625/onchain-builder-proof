'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumKeyRotation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Key Rotation"
      subtitle="Rotate cryptographic keys using post-quantum algorithms"
      accent="purple"
      ctaLabel="Configure Rotation"
      payloadPrefix="QKEY_ROTATION"
      fields={[
        {
          key: 'rotationId',
          label: 'Rotation Identifier',
          type: 'text',
          placeholder: 'rotation-001',
          required: true,
        },
        {
          key: 'quantumAlgorithm',
          label: 'Quantum Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'rotationSchedule',
          label: 'Rotation Schedule',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Event-Based', value: 'event_based' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'migrationWindow',
          label: 'Migration Window (days)',
          type: 'number',
          placeholder: '30',
          required: true,
        },
        {
          key: 'rotationPolicy',
          label: 'Rotation Policy',
          type: 'textarea',
          placeholder: 'Key rotation rules and migration parameters',
        },
      ]}
    />
  )
}

