'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedEventTicketingPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Event Ticketing Platform"
      subtitle="Event ticketing platform with NFT-based tickets and resale controls"
      accent="purple"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_TICKETING"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'ticketType',
          label: 'Ticket Type',
          type: 'select',
          options: [
            { label: 'NFT', value: 'nft' },
            { label: 'Soulbound', value: 'soulbound' },
            { label: 'Transferable', value: 'transferable' },
          ],
          required: true,
        },
        {
          key: 'resalePolicy',
          label: 'Resale Policy',
          type: 'select',
          options: [
            { label: 'Allowed', value: 'allowed' },
            { label: 'Restricted', value: 'restricted' },
            { label: 'Prohibited', value: 'prohibited' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Event ticketing platform rules and resale parameters',
        },
      ]}
    />
  )
}

