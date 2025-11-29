'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiChainKeyManagement(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Chain Key Management"
      subtitle="Manages keys across multiple chains securely"
      accent="purple"
      ctaLabel="Configure Key Management"
      payloadPrefix="MULTICHAIN_KEY_MGMT"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'targetChains',
          label: 'Target Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
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
          key: 'keyPolicy',
          label: 'Key Policy',
          type: 'textarea',
          placeholder: 'Key management rules and rotation parameters',
        },
      ]}
    />
  )
}

