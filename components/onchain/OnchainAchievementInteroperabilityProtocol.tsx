'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementInteroperabilityProtocol(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Interoperability Protocol"
      subtitle="Enables interoperability between different blockchain protocols"
      accent="indigo"
      ctaLabel="Deploy Protocol"
      payloadPrefix="INTEROP_PROTOCOL"
      fields={[
        {
          key: 'protocolId',
          label: 'Protocol Identifier',
          type: 'text',
          placeholder: 'protocol-001',
          required: true,
        },
        {
          key: 'supportedChains',
          label: 'Supported Chains',
          type: 'textarea',
          placeholder: 'ethereum,polygon,arbitrum,optimism',
          required: true,
        },
        {
          key: 'protocolStandard',
          label: 'Protocol Standard',
          type: 'select',
          options: [
            { label: 'IBC', value: 'ibc' },
            { label: 'XCMP', value: 'xcmp' },
            { label: 'CCIP', value: 'ccip' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Light Client', value: 'light_client' },
            { label: 'Relay', value: 'relay' },
            { label: 'Oracle', value: 'oracle' },
          ],
          required: true,
        },
        {
          key: 'protocolPolicy',
          label: 'Protocol Policy',
          type: 'textarea',
          placeholder: 'Interoperability protocol rules and verification parameters',
        },
      ]}
    />
  )
}

