'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherOrchestrationCore(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Orchestration Core"
      subtitle="Core orchestration engine for aether operations"
      accent="purple"
      ctaLabel="Deploy Core"
      payloadPrefix="AETHER_ORCH_CORE"
      fields={[
        {
          key: 'coreId',
          label: 'Core Identifier',
          type: 'text',
          placeholder: 'core-001',
          required: true,
        },
        {
          key: 'orchestrationDomains',
          label: 'Orchestration Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'coreMode',
          label: 'Core Mode',
          type: 'select',
          options: [
            { label: 'Unified', value: 'unified' },
            { label: 'Distributed', value: 'distributed' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'corePolicy',
          label: 'Core Policy',
          type: 'textarea',
          placeholder: 'Orchestration rules and domain coordination',
        },
      ]}
    />
  )
}

