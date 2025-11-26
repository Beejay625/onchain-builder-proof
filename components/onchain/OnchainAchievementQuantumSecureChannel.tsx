'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSecureChannel(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Secure Channel"
      subtitle="Secure communication channel with quantum resistance"
      accent="purple"
      ctaLabel="Establish Channel"
      payloadPrefix="QUANTUM_CHANNEL"
      fields={[
        {
          key: 'channelId',
          label: 'Channel Identifier',
          type: 'text',
          placeholder: 'channel-001',
          required: true,
        },
        {
          key: 'participant1',
          label: 'Participant 1 Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'participant2',
          label: 'Participant 2 Address',
          type: 'text',
          placeholder: '0x...',
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
          key: 'channelType',
          label: 'Channel Type',
          type: 'select',
          options: [
            { label: 'Bidirectional', value: 'bidirectional' },
            { label: 'Unidirectional', value: 'unidirectional' },
          ],
          required: true,
        },
        {
          key: 'expiryTimestamp',
          label: 'Expiry Timestamp',
          type: 'number',
          placeholder: '1735689600',
        },
      ]}
    />
  )
}

