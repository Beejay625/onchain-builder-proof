'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarSettlementEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Settlement Engine"
      subtitle="Settlement engine for stellar transactions"
      accent="blue"
      ctaLabel="Deploy Engine"
      payloadPrefix="STELLAR_SETTLE"
      fields={[
        {
          key: 'engineId',
          label: 'Engine Identifier',
          type: 'text',
          placeholder: 'engine-001',
          required: true,
        },
        {
          key: 'settlementMode',
          label: 'Settlement Mode',
          type: 'select',
          options: [
            { label: 'Atomic', value: 'atomic' },
            { label: 'Optimistic', value: 'optimistic' },
            { label: 'Delayed', value: 'delayed' },
          ],
          required: true,
        },
        {
          key: 'finalityTime',
          label: 'Finality Time (seconds)',
          type: 'number',
          placeholder: '12',
          required: true,
        },
        {
          key: 'enginePolicy',
          label: 'Engine Policy',
          type: 'textarea',
          placeholder: 'Settlement engine rules and finality parameters',
        },
      ]}
    />
  )
}

