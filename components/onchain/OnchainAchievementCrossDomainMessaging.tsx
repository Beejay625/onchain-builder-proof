'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossDomainMessaging(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Domain Messaging"
      subtitle="Messaging system for cross-domain communication"
      accent="indigo"
      ctaLabel="Send Message"
      payloadPrefix="XDOMAIN_MSG"
      fields={[
        {
          key: 'messageId',
          label: 'Message Identifier',
          type: 'text',
          placeholder: 'msg-001',
          required: true,
        },
        {
          key: 'sourceDomain',
          label: 'Source Domain',
          type: 'text',
          placeholder: 'domain1',
          required: true,
        },
        {
          key: 'targetDomain',
          label: 'Target Domain',
          type: 'text',
          placeholder: 'domain2',
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
          key: 'payloadHash',
          label: 'Payload Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'deliveryGuarantee',
          label: 'Delivery Guarantee',
          type: 'select',
          options: [
            { label: 'At Most Once', value: 'at_most_once' },
            { label: 'At Least Once', value: 'at_least_once' },
            { label: 'Exactly Once', value: 'exactly_once' },
          ],
          required: true,
        },
        {
          key: 'messageContent',
          label: 'Message Content',
          type: 'textarea',
          placeholder: 'Message content or reference',
        },
      ]}
    />
  )
}

