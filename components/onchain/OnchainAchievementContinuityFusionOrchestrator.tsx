'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementContinuityFusionOrchestrator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Continuity Fusion Orchestrator"
      subtitle="Orchestrate multi-domain continuity flows"
      accent="purple"
      ctaLabel="Deploy Orchestrator"
      payloadPrefix="FUSION_ORCH"
      fields={[
        {
          key: 'domain',
          label: 'Primary Domain',
          type: 'text',
          placeholder: 'ethereum-mainnet',
          required: true,
        },
        {
          key: 'fusedDomains',
          label: 'Fused Domains',
          type: 'textarea',
          placeholder: 'arbitrum-one,optimism,base',
          required: true,
        },
        {
          key: 'syncPolicy',
          label: 'Sync Policy',
          type: 'select',
          options: [
            { label: 'Real-time', value: 'realtime' },
            { label: 'Batch', value: 'batch' },
            { label: 'On-demand', value: 'ondemand' },
          ],
          required: true,
        },
        {
          key: 'checkpointInterval',
          label: 'Checkpoint Interval (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'notes',
          label: 'Configuration Notes',
          type: 'textarea',
          placeholder: 'Fusion parameters and validation rules',
        },
      ]}
    />
  )
}

