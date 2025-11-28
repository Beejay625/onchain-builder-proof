'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumMigrationPath(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Migration Path"
      subtitle="Migration strategy from classical to post-quantum"
      accent="amber"
      ctaLabel="Create Path"
      payloadPrefix="QMIGRATION_PATH"
      fields={[
        {
          key: 'pathId',
          label: 'Path Identifier',
          type: 'text',
          placeholder: 'path-001',
          required: true,
        },
        {
          key: 'algorithmTransition',
          label: 'Algorithm Transition',
          type: 'textarea',
          placeholder: 'Classical to PQ algorithm mapping',
          required: true,
        },
        {
          key: 'migrationTimeline',
          label: 'Migration Timeline (days)',
          type: 'number',
          placeholder: '180',
          required: true,
        },
        {
          key: 'migrationStrategy',
          label: 'Migration Strategy',
          type: 'select',
          options: [
            { label: 'Big-Bang', value: 'big_bang' },
            { label: 'Gradual', value: 'gradual' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'pathPolicy',
          label: 'Path Policy',
          type: 'textarea',
          placeholder: 'Migration rules and timeline parameters',
        },
      ]}
    />
  )
}

