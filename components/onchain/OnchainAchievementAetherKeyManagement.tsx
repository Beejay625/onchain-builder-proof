'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherKeyManagement(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Key Management"
      subtitle="Key management system for aether networks"
      accent="purple"
      ctaLabel="Configure Key Management"
      payloadPrefix="AETHER_KEY_MGMT"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'keyType',
          label: 'Key Type',
          type: 'select',
          options: [
            { label: 'Symmetric', value: 'symmetric' },
            { label: 'Asymmetric', value: 'asymmetric' },
            { label: 'Quantum-Resistant', value: 'quantum_resistant' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'keyRotationPolicy',
          label: 'Key Rotation Policy',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Usage-Based', value: 'usage_based' },
            { label: 'Event-Based', value: 'event_based' },
          ],
          required: true,
        },
        {
          key: 'keyStorage',
          label: 'Key Storage',
          type: 'select',
          options: [
            { label: 'Hardware', value: 'hardware' },
            { label: 'Software', value: 'software' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'keyPolicy',
          label: 'Key Policy',
          type: 'textarea',
          placeholder: 'Key management rules and security parameters',
        },
      ]}
    />
  )
}

