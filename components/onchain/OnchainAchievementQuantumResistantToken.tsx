'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResistantToken(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resistant Token"
      subtitle="Tokens secured with post-quantum cryptography"
      accent="yellow"
      ctaLabel="Create Token"
      payloadPrefix="QRESISTANT_TOKEN"
      fields={[
        {
          key: 'tokenId',
          label: 'Token Identifier',
          type: 'text',
          placeholder: 'token-001',
          required: true,
        },
        {
          key: 'securityLayers',
          label: 'Security Layers',
          type: 'textarea',
          placeholder: 'encryption,signing,verification',
          required: true,
        },
        {
          key: 'transferRules',
          label: 'Transfer Rules',
          type: 'textarea',
          placeholder: 'Token transfer rules and restrictions',
        },
        {
          key: 'tokenPolicy',
          label: 'Token Policy',
          type: 'textarea',
          placeholder: 'Token security rules and transfer parameters',
        },
      ]}
    />
  )
}

