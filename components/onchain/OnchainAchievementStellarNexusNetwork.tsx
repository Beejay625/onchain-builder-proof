'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarNexusNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Nexus Network"
      subtitle="Network infrastructure for stellar nexus operations"
      accent="purple"
      ctaLabel="Join Network"
      payloadPrefix="STELLAR_NEXUS_NET"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'networkType',
          label: 'Network Type',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
            { label: 'Consortium', value: 'consortium' },
          ],
          required: true,
        },
        {
          key: 'participantCount',
          label: 'Participant Count',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Network rules and participation requirements',
        },
      ]}
    />
  )
}

