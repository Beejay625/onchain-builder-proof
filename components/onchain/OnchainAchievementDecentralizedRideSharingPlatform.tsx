'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedRideSharingPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Ride Sharing Platform"
      subtitle="Ride sharing platform with smart contracts for driver-rider matching"
      accent="cyan"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_RIDESHARE"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'paymentModel',
          label: 'Payment Model',
          type: 'select',
          options: [
            { label: 'Direct', value: 'direct' },
            { label: 'Escrow', value: 'escrow' },
            { label: 'Subscription', value: 'subscription' },
          ],
          required: true,
        },
        {
          key: 'ratingSystem',
          label: 'Rating System',
          type: 'select',
          options: [
            { label: 'On-Chain', value: 'onchain' },
            { label: 'Off-Chain', value: 'offchain' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Ride sharing platform rules and payment parameters',
        },
      ]}
    />
  )
}

