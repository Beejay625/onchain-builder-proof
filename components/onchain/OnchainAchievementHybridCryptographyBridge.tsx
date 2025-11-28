'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementHybridCryptographyBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Hybrid Cryptography Bridge"
      subtitle="Bridge between classical and post-quantum crypto"
      accent="blue"
      ctaLabel="Deploy Bridge"
      payloadPrefix="HYBRID_CRYPTO_BRIDGE"
      fields={[
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'classicalAlgorithm',
          label: 'Classical Algorithm',
          type: 'select',
          options: [
            { label: 'RSA', value: 'rsa' },
            { label: 'ECDSA', value: 'ecdsa' },
            { label: 'EdDSA', value: 'eddsa' },
          ],
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
          ],
          required: true,
        },
        {
          key: 'transitionSchedule',
          label: 'Transition Schedule',
          type: 'textarea',
          placeholder: 'Migration timeline and compatibility rules',
          required: true,
        },
        {
          key: 'compatibilityMode',
          label: 'Compatibility Mode',
          type: 'select',
          options: [
            { label: 'Dual-Support', value: 'dual' },
            { label: 'Gradual', value: 'gradual' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
      ]}
    />
  )
}

