'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedFoodDeliveryPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Food Delivery Platform"
      subtitle="Food delivery platform with order tracking and payment escrow"
      accent="orange"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_FOOD_DELIVERY"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'orderTracking',
          label: 'Order Tracking',
          type: 'select',
          options: [
            { label: 'Real-Time', value: 'realtime' },
            { label: 'Milestone-Based', value: 'milestone' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'paymentRelease',
          label: 'Payment Release',
          type: 'select',
          options: [
            { label: 'On Delivery', value: 'on_delivery' },
            { label: 'Milestone', value: 'milestone' },
            { label: 'Automatic', value: 'automatic' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Food delivery platform rules and tracking parameters',
        },
      ]}
    />
  )
}

