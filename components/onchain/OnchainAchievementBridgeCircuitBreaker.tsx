'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeCircuitBreaker(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Circuit Breaker"
      subtitle="Circuit breaker for bridge operations"
      accent="orange"
      ctaLabel="Deploy Circuit Breaker"
      payloadPrefix="BRIDGE_CIRCUIT_BREAKER"
      fields={[
        {
          key: 'breakerId',
          label: 'Breaker Identifier',
          type: 'text',
          placeholder: 'breaker-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'triggerCondition',
          label: 'Trigger Condition',
          type: 'select',
          options: [
            { label: 'Error Rate', value: 'error_rate' },
            { label: 'Latency', value: 'latency' },
            { label: 'Volume', value: 'volume' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'threshold',
          label: 'Threshold',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'breakerPolicy',
          label: 'Breaker Policy',
          type: 'textarea',
          placeholder: 'Circuit breaker rules and threshold parameters',
        },
      ]}
    />
  )
}

