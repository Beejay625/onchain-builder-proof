'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDynamicConsensusOrchestrator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Dynamic Consensus Orchestrator"
      subtitle="Orchestrator for dynamic consensus mechanisms"
      accent="teal"
      ctaLabel="Deploy Orchestrator"
      payloadPrefix="DYNAMIC_CONSENSUS"
      fields={[
        {
          key: 'orchestratorId',
          label: 'Orchestrator Identifier',
          type: 'text',
          placeholder: 'orch-001',
          required: true,
        },
        {
          key: 'consensusNetworks',
          label: 'Consensus Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
          required: true,
        },
        {
          key: 'consensusType',
          label: 'Consensus Type',
          type: 'select',
          options: [
            { label: 'BFT', value: 'bft' },
            { label: 'PoS', value: 'pos' },
            { label: 'PoA', value: 'poa' },
            { label: 'Dynamic', value: 'dynamic' },
          ],
          required: true,
        },
        {
          key: 'adaptationRate',
          label: 'Adaptation Rate',
          type: 'select',
          options: [
            { label: 'Fast', value: 'fast' },
            { label: 'Medium', value: 'medium' },
            { label: 'Slow', value: 'slow' },
          ],
          required: true,
        },
        {
          key: 'orchestratorPolicy',
          label: 'Orchestrator Policy',
          type: 'textarea',
          placeholder: 'Consensus rules and adaptation parameters',
        },
      ]}
    />
  )
}

