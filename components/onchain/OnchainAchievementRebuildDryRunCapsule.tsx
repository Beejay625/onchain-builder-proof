'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementRebuildDryRunCapsule(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Rebuild Dry Run Capsule"
      subtitle="Prove recovery rehearsals happened"
      accent="lime"
      ctaLabel="Log Dry Run Capsule"
      payloadPrefix="DRYRUN_CAPSULE"
      fields={[
        {
          key: 'capsuleId',
          label: 'Capsule ID',
          type: 'text',
          placeholder: 'dryrun-12',
          required: true,
        },
        {
          key: 'environment',
          label: 'Environment',
          type: 'select',
          options: [
            { label: 'Staging', value: 'staging' },
            { label: 'Canary', value: 'canary' },
            { label: 'Prod Shadow', value: 'prod_shadow' },
          ],
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
          key: 'result',
          label: 'Result',
          type: 'textarea',
          placeholder: 'Success / issues',
        },
      ]}
    />
  )
}
