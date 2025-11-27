'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusInteroperabilityHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Interoperability Hub"
      subtitle="Hub for nexus network interoperability"
      accent="blue"
      ctaLabel="Register Hub"
      payloadPrefix="NEXUS_INTEROP_HUB"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'connectedNexuses',
          label: 'Connected Nexus Networks',
          type: 'textarea',
          placeholder: 'nexus1,nexus2,nexus3',
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
          placeholder: 'Interoperability rules and protocol requirements',
        },
      ]}
    />
  )
}

