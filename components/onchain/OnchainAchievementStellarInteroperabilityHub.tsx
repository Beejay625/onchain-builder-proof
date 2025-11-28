'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarInteroperabilityHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Interoperability Hub"
      subtitle="Hub for stellar network interoperability"
      accent="blue"
      ctaLabel="Register Hub"
      payloadPrefix="STELLAR_INTEROP_HUB"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'connectedNetworks',
          label: 'Connected Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
          required: true,
        },
        {
          key: 'interopProtocols',
          label: 'Interoperability Protocols',
          type: 'textarea',
          placeholder: 'IBC,XCMP,Custom',
          required: true,
        },
        {
          key: 'translationLayer',
          label: 'Translation Layer',
          type: 'select',
          options: [
            { label: 'Protocol-Agnostic', value: 'agnostic' },
            { label: 'Protocol-Specific', value: 'specific' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'hubAddress',
          label: 'Hub Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'hubPolicy',
          label: 'Hub Policy',
          type: 'textarea',
          placeholder: 'Interoperability hub rules and protocol parameters',
        },
      ]}
    />
  )
}

