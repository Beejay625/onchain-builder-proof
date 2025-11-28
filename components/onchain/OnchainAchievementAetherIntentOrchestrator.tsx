'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherIntentOrchestrator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Intent Orchestrator"
      subtitle="Orchestrate intents across aether networks"
      accent="orange"
      ctaLabel="Deploy Orchestrator"
      payloadPrefix="AETHER_INTENT_ORCH"
      fields={[
        {
          key: 'orchestratorId',
          label: 'Orchestrator Identifier',
          type: 'text',
          placeholder: 'orch-001',
          required: true,
        },
        {
          key: 'targetNetworks',
          label: 'Target Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
          required: true,
        },
        {
          key: 'orchestrationStrategy',
          label: 'Orchestration Strategy',
          type: 'select',
          options: [
            { label: 'Sequential', value: 'sequential' },
            { label: 'Parallel', value: 'parallel' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'failureMode',
          label: 'Failure Mode',
          type: 'select',
          options: [
            { label: 'Fail-Fast', value: 'fail_fast' },
            { label: 'Best-Effort', value: 'best_effort' },
            { label: 'Compensating', value: 'compensating' },
          ],
          required: true,
        },
        {
          key: 'orchestratorPolicy',
          label: 'Orchestrator Policy',
          type: 'textarea',
          placeholder: 'Intent orchestration rules and failure handling parameters',
        },
      ]}
    />
  )
}

