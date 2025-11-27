'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignTreasuryOrchestrator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Treasury Orchestrator"
      subtitle="Orchestrate treasury operations across sovereignties"
      accent="yellow"
      ctaLabel="Deploy Orchestrator"
      payloadPrefix="SOV_TREASURY_ORCH"
      fields={[
        {
          key: 'orchestratorId',
          label: 'Orchestrator Identifier',
          type: 'text',
          placeholder: 'orch-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'assetTypes',
          label: 'Asset Types',
          type: 'textarea',
          placeholder: 'ETH,USDC,DAI,WBTC',
          required: true,
        },
        {
          key: 'orchestrationMode',
          label: 'Orchestration Mode',
          type: 'select',
          options: [
            { label: 'Unified', value: 'unified' },
            { label: 'Segregated', value: 'segregated' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'allocationPolicy',
          label: 'Allocation Policy',
          type: 'textarea',
          placeholder: 'Treasury allocation rules across sovereignties',
        },
      ]}
    />
  )
}

