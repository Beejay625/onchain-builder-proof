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
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'channelType',
          label: 'Channel Type',
          type: 'select',
          options: [
            { label: 'Payment', value: 'payment' },
            { label: 'Generalized', value: 'generalized' },
            { label: 'Virtual', value: 'virtual' },
          ],
          required: true,
        },
        {
          key: 'participants',
          label: 'Participants',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
          required: true,
        },
        {
          key: 'timeoutPeriod',
          label: 'Timeout Period (blocks)',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'State channel rules and timeout parameters',
        },
      ]}
    />
  )
}

