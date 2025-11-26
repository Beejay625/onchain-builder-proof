'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementLatencyFuseConsole(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Latency Fuse Console"
      subtitle="Trip fuses before SLAs melt"
      accent="blue"
      ctaLabel="Activate Latency Fuse"
      payloadPrefix="FUSE_CONSOLE"
      fields={[
        {
          key: 'service',
          label: 'Service',
          type: 'text',
          placeholder: 'proof-stream',
          required: true,
        },
        {
          key: 'fuseThreshold',
          label: 'Fuse Threshold (ms)',
          type: 'number',
          placeholder: '350',
          required: true,
        },
        {
          key: 'actionPlan',
          label: 'Action Plan',
          type: 'textarea',
          placeholder: 'Batch proofs, pause payouts',
          required: true,
        },
        {
          key: 'owner',
          label: 'Owner',
          type: 'text',
          placeholder: 'ops-lead',
          required: true,
        },
      ]}
    />
  )
}
