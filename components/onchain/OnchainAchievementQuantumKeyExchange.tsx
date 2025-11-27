'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumKeyExchange(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Key Exchange"
      subtitle="Key exchange protocol with quantum resistance"
      accent="purple"
      ctaLabel="Initiate Exchange"
      payloadPrefix="QKEY_EXCHANGE"
      fields={[
        {
          key: 'exchangeId',
          label: 'Exchange Identifier',
          type: 'text',
          placeholder: 'exchange-001',
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
          key: 'keyExchangeProtocol',
          label: 'Key Exchange Protocol',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'NTRU', value: 'ntru' },
            { label: 'McEliece', value: 'mceliece' },
          ],
          required: true,
        },
        {
          key: 'sessionKeyHash',
          label: 'Session Key Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
      ]}
    />
  )
}

