'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStateChannelManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="State Channel Manager"
      subtitle="Manages off-chain state channels for scalable transactions"
      accent="cyan"
      ctaLabel="Create Channel"
      payloadPrefix="STATE_CHANNEL_MGR"
      fields={[
        {
          key: 'channelId',
          label: 'Channel Identifier',
          type: 'text',
          placeholder: 'channel-001',
          required: true,
        },
        {
          key: 'participants',
          label: 'Participant Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...',
          required: true,
        },
        {
          key: 'channelType',
          label: 'Channel Type',
          type: 'select',
          options: [
            { label: 'Payment', value: 'payment' },
            { label: 'General', value: 'general' },
            { label: 'App-Specific', value: 'app_specific' },
          ],
          required: true,
        },
        {
          key: 'disputePeriod',
          label: 'Dispute Period (blocks)',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'channelPolicy',
          label: 'Channel Policy',
          type: 'textarea',
          placeholder: 'State channel rules and dispute parameters',
        },
      ]}
    />
  )
}
