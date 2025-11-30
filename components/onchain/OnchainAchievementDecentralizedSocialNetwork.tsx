'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedSocialNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Social Network"
      subtitle="Social network with content ownership and monetization"
      accent="blue"
      ctaLabel="Deploy Network"
      payloadPrefix="DECENTRALIZED_SOCIAL"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'contentType',
          label: 'Content Type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'monetizationModel',
          label: 'Monetization Model',
          type: 'select',
          options: [
            { label: 'Tips', value: 'tips' },
            { label: 'Subscriptions', value: 'subscriptions' },
            { label: 'NFTs', value: 'nfts' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Social network rules and monetization parameters',
        },
      ]}
    />
  )
}

