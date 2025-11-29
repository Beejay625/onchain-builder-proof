'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTokenBurnManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Token Burn Manager"
      subtitle="Manages token burning with scheduled and event-based burns"
      accent="red"
      ctaLabel="Configure Burn"
      payloadPrefix="TOKEN_BURN_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'tokenAddress',
          label: 'Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'burnType',
          label: 'Burn Type',
          type: 'select',
          options: [
            { label: 'Scheduled', value: 'scheduled' },
            { label: 'Event-Based', value: 'event_based' },
            { label: 'Manual', value: 'manual' },
          ],
          required: true,
        },
        {
          key: 'burnAmount',
          label: 'Burn Amount',
          type: 'text',
          placeholder: '1000000',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Token burn rules and amount parameters',
        },
      ]}
    />
  )
}

