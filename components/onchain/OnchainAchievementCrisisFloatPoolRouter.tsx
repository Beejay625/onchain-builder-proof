'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrisisFloatPoolRouter(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Crisis Float Pool Router"
      subtitle="Wire float pools to stressed squads"
      accent="teal"
      ctaLabel="Route Crisis Float"
      payloadPrefix="FLOAT_POOL"
      fields={[
        {
          key: 'poolLabel',
          label: 'Pool Label',
          type: 'text',
          placeholder: 'guardian-float',
          required: true,
        },
        {
          key: 'token',
          label: 'Token',
          type: 'select',
          options: [
            { label: 'USDC', value: 'USDC' },
            { label: 'DAI', value: 'DAI' },
            { label: 'ETH', value: 'ETH' },
          ],
          required: true,
        },
        {
          key: 'cap',
          label: 'Cap',
          type: 'number',
          placeholder: '25000',
          required: true,
        },
        {
          key: 'trigger',
          label: 'Unlock Trigger',
          type: 'textarea',
          placeholder: 'Latency SLA breach > 30m',
          required: true,
        },
      ]}
    />
  )
}
