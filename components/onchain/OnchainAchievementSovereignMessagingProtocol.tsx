'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignMessagingProtocol(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Messaging Protocol"
      subtitle="Messaging protocol for sovereign communications"
      accent="indigo"
      ctaLabel="Deploy Protocol"
      payloadPrefix="SOV_MSG_PROTOCOL"
      fields={[
        {
          key: 'protocolId',
          label: 'Protocol Identifier',
          type: 'text',
          placeholder: 'protocol-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'messageType',
          label: 'Message Type',
          type: 'select',
          options: [
            { label: 'State Update', value: 'state_update' },
            { label: 'Intent', value: 'intent' },
            { label: 'Attestation', value: 'attestation' },
            { label: 'Notification', value: 'notification' },
          ],
          required: true,
        },
        {
          key: 'encryptionRequired',
          label: 'Encryption Required',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Optional', value: 'optional' },
          ],
          required: true,
        },
        {
          key: 'deliveryGuarantee',
          label: 'Delivery Guarantee',
          type: 'select',
          options: [
            { label: 'At-Least-Once', value: 'at_least_once' },
            { label: 'Exactly-Once', value: 'exactly_once' },
            { label: 'At-Most-Once', value: 'at_most_once' },
          ],
          required: true,
        },
        {
          key: 'protocolPolicy',
          label: 'Protocol Policy',
          type: 'textarea',
          placeholder: 'Messaging rules and sovereignty compliance',
        },
      ]}
    />
  )
}

