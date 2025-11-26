'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBlastproofCommandQueue(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Blastproof Command Queue"
      subtitle="Route commands through resilient queues"
      accent="amber"
      ctaLabel="Publish Command Queue"
      payloadPrefix="COMMAND_QUEUE"
      fields={[
        {
          key: 'queueName',
          label: 'Queue Name',
          type: 'text',
          placeholder: 'mint-ops-fallback',
          required: true,
        },
        {
          key: 'commandBurst',
          label: 'Command Burst',
          type: 'number',
          placeholder: '20',
          required: true,
        },
        {
          key: 'safeguard',
          label: 'Safeguard',
          type: 'textarea',
          placeholder: 'Guardian quorum, policy hash',
          required: true,
        },
        {
          key: 'reviewer',
          label: 'Reviewer',
          type: 'text',
          placeholder: 'ops-lead',
          required: true,
        },
      ]}
    />
  )
}
