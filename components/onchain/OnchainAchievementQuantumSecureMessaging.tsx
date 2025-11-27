'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSecureMessaging(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Secure Messaging"
      subtitle="Secure messaging with quantum-resistant encryption"
      accent="purple"
      ctaLabel="Configure Messaging"
      payloadPrefix="QMSG"
      fields={[
        {
          key: 'channelId',
          label: 'Channel Identifier',
          type: 'text',
          placeholder: 'channel-001',
          required: true,
        },
        {
          key: 'participants',
          label: 'Participant Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...',
          required: true,
        },
        {
          key: 'encryptionAlgorithm',
          label: 'Encryption Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
          ],
          required: true,
        },
        {
          key: 'messageRetention',
          label: 'Message Retention (days)',
          type: 'number',
          placeholder: '30',
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
      ]}
    />
  )
}

