'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedScientificPublicationPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Scientific Publication Platform"
      subtitle="Platform for publishing and peer-reviewing scientific papers"
      accent="slate"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_SCIENTIFIC_PUB"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'reviewModel',
          label: 'Review Model',
          type: 'select',
          options: [
            { label: 'Open Peer Review', value: 'open' },
            { label: 'Blind Peer Review', value: 'blind' },
            { label: 'Double-Blind', value: 'double_blind' },
          ],
          required: true,
        },
        {
          key: 'publicationType',
          label: 'Publication Type',
          type: 'select',
          options: [
            { label: 'Preprint', value: 'preprint' },
            { label: 'Peer-Reviewed', value: 'peer_reviewed' },
            { label: 'Both', value: 'both' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Scientific publication platform rules and review parameters',
        },
      ]}
    />
  )
}

