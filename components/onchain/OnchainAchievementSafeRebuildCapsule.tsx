'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSafeRebuildCapsule(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Safe Rebuild Capsule"
      subtitle="Describe clean-room rebuild plans"
      accent="lime"
      ctaLabel="Log Rebuild Capsule"
      payloadPrefix="SAFE_REBUILD"
      fields={[
        {
        key: 'targetEnv',
        label: 'Target Environment',
        type: 'text',
        placeholder: 'staging-eu2',
        required: true,
        },
        {
        key: 'artifactHash',
        label: 'Artifact Hash',
        type: 'text',
        placeholder: '0xartifact',
        required: true,
        },
        {
        key: 'approvals',
        label: 'Approvals',
        type: 'text',
        placeholder: 'guardian1, guardian2',
        required: true,
        },
        {
        key: 'rollbackPlan',
        label: 'Rollback Plan',
        type: 'textarea',
        placeholder: 'Steps if rebuild fails',
        required: true,
        },
      ]}
    />
  )
}
