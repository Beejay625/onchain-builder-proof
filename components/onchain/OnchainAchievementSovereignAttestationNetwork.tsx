'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignAttestationNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Attestation Network"
      subtitle="Network for sovereign attestations across boundaries"
      accent="violet"
      ctaLabel="Join Network"
      payloadPrefix="SOV_ATTEST_NET"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'participantSovereignties',
          label: 'Participant Sovereignties',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'attestationStandard',
          label: 'Attestation Standard',
          type: 'select',
          options: [
            { label: 'EAS', value: 'eas' },
            { label: 'Verax', value: 'verax' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'trustModel',
          label: 'Trust Model',
          type: 'select',
          options: [
            { label: 'Web-of-Trust', value: 'web_of_trust' },
            { label: 'Hierarchical', value: 'hierarchical' },
            { label: 'Distributed', value: 'distributed' },
          ],
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Network rules and attestation requirements',
        },
      ]}
    />
  )
}

