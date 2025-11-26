'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementResponderBondEscrow(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Responder Bond Escrow"
      subtitle="Stake responder accountability"
      accent="emerald"
      ctaLabel="Bond Responder"
      payloadPrefix="RESPONDER_BOND"
      fields={[
        {
          key: 'responder',
          label: 'Responder',
          type: 'text',
          placeholder: 'guardian.ops',
          required: true,
        },
        {
          key: 'bondAmount',
          label: 'Bond Amount',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'expiry',
          label: 'Expiry',
          type: 'text',
          placeholder: '2025-02-01T00:00Z',
          required: true,
        },
        {
          key: 'conditions',
          label: 'Conditions',
          type: 'textarea',
          placeholder: 'Released after SLA met',
          required: true,
        },
      ]}
    />
  )
}
