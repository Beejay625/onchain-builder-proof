'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusIntentOrchestrator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Intent Orchestrator"
      subtitle="Orchestrate intents across nexus networks"
      accent="orange"
      ctaLabel="Deploy Orchestrator"
      payloadPrefix="NEXUS_INTENT_ORCH"
      fields={[
        {
          key: 'orchestratorId',
          label: 'Orchestrator Identifier',
          type: 'text',
          placeholder: 'orch-001',
          required: true,
        },
        {
          key: 'nexusNetworks',
          label: 'Nexus Networks',
          type: 'textarea',
          placeholder: 'nexus1,nexus2,nexus3',
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
          key: 'orchestrationPolicy',
          label: 'Orchestration Policy',
          type: 'textarea',
          placeholder: 'Intent orchestration rules and sovereignty boundaries',
        },
      ]}
    />
  )
}

