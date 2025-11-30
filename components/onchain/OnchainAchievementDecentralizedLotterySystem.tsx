'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedLotterySystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Lottery System"
      subtitle="Provably fair lottery system with verifiable randomness"
      accent="yellow"
      ctaLabel="Create Lottery"
      payloadPrefix="DECENTRALIZED_LOTTERY"
      fields={[
        {
          key: 'lotteryId',
          label: 'Lottery Identifier',
          type: 'text',
          placeholder: 'lottery-001',
          required: true,
        },
        {
          key: 'ticketPrice',
          label: 'Ticket Price',
          type: 'text',
          placeholder: '100000000000000000',
          required: true,
        },
        {
          key: 'randomnessSource',
          label: 'Randomness Source',
          type: 'select',
          options: [
            { label: 'Chainlink VRF', value: 'chainlink_vrf' },
            { label: 'Commit-Reveal', value: 'commit_reveal' },
            { label: 'RANDAO', value: 'randao' },
          ],
          required: true,
        },
        {
          key: 'drawFrequency',
          label: 'Draw Frequency (blocks)',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'lotteryPolicy',
          label: 'Lottery Policy',
          type: 'textarea',
          placeholder: 'Lottery system rules and randomness parameters',
        },
      ]}
    />
  )
}

