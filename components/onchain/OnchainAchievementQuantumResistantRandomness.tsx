'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResistantRandomness(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resistant Randomness"
      subtitle="Random number generation with post-quantum security"
      accent="indigo"
      ctaLabel="Configure Randomness"
      payloadPrefix="QRESISTANT_RANDOM"
      fields={[
        {
          key: 'randomnessId',
          label: 'Randomness Identifier',
          type: 'text',
          placeholder: 'random-001',
          required: true,
        },
        {
          key: 'entropySource',
          label: 'Entropy Source',
          type: 'select',
          options: [
            { label: 'Hardware', value: 'hardware' },
            { label: 'Cryptographic', value: 'cryptographic' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Commit-Reveal', value: 'commit_reveal' },
            { label: 'VRF', value: 'vrf' },
            { label: 'Beacon', value: 'beacon' },
          ],
          required: true,
        },
        {
          key: 'randomnessPolicy',
          label: 'Randomness Policy',
          type: 'textarea',
          placeholder: 'Randomness generation rules and verification parameters',
        },
      ]}
    />
  )
}

