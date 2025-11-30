'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedRandomNumberGenerator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Random Number Generator"
      subtitle="Generates verifiable random numbers for onchain applications"
      accent="purple"
      ctaLabel="Deploy Generator"
      payloadPrefix="DECENTRALIZED_RNG"
      fields={[
        {
          key: 'generatorId',
          label: 'Generator Identifier',
          type: 'text',
          placeholder: 'generator-001',
          required: true,
        },
        {
          key: 'randomnessMethod',
          label: 'Randomness Method',
          type: 'select',
          options: [
            { label: 'Chainlink VRF', value: 'chainlink_vrf' },
            { label: 'Commit-Reveal', value: 'commit_reveal' },
            { label: 'RANDAO', value: 'randao' },
            { label: 'VRF Beacon', value: 'vrf_beacon' },
          ],
          required: true,
        },
        {
          key: 'entropySource',
          label: 'Entropy Source',
          type: 'select',
          options: [
            { label: 'On-Chain', value: 'onchain' },
            { label: 'Off-Chain', value: 'offchain' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'verificationRequired',
          label: 'Verification Required',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          required: true,
        },
        {
          key: 'generatorPolicy',
          label: 'Generator Policy',
          type: 'textarea',
          placeholder: 'RNG rules and randomness parameters',
        },
      ]}
    />
  )
}

