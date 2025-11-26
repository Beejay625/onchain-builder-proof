'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntentFusionEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intent Fusion Engine"
      subtitle="Fuse intents across multiple domains"
      accent="orange"
      ctaLabel="Fuse Intent"
      payloadPrefix="INTENT_FUSION"
      fields={[
        {
          key: 'intentId',
          label: 'Intent Identifier',
          type: 'text',
          placeholder: 'intent-001',
          required: true,
        },
        {
          key: 'sourceIntent',
          label: 'Source Intent Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'targetDomains',
          label: 'Target Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'fusionStrategy',
          label: 'Fusion Strategy',
          type: 'select',
          options: [
            { label: 'Atomic', value: 'atomic' },
            { label: 'Best Effort', value: 'best_effort' },
            { label: 'Partial', value: 'partial' },
          ],
          required: true,
        },
        {
          key: 'deadline',
          label: 'Deadline (Unix timestamp)',
          type: 'number',
          placeholder: '1735689600',
          required: true,
        },
        {
          key: 'fallbackIntent',
          label: 'Fallback Intent Hash',
          type: 'text',
          placeholder: '0x...',
        },
      ]}
    />
  )
}

