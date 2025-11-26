'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAutopsyContinuityLoom(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Autopsy Continuity Loom"
      subtitle="Thread learnings across incidents"
      accent="cyan"
      ctaLabel="Log Autopsy Thread"
      payloadPrefix="AUTOPSY_LOOM"
      fields={[
        {
          key: 'thread',
          label: 'Thread Label',
          type: 'text',
          placeholder: 'rpc-lag',
          required: true,
        },
        {
          key: 'artifactCid',
          label: 'Artifact CID',
          type: 'text',
          placeholder: 'bafy...',
          required: true,
        },
        {
          key: 'loopOwner',
          label: 'Loop Owner',
          type: 'text',
          placeholder: 'ops-learning',
          required: true,
        },
        {
          key: 'insight',
          label: 'Insight',
          type: 'textarea',
          placeholder: 'Continuity risk uncovered',
          required: true,
        },
      ]}
    />
  )
}
