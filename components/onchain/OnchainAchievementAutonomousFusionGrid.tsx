'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAutonomousFusionGrid(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Autonomous Fusion Grid"
      subtitle="Grid for autonomous fusion operations across domains"
      accent="cyan"
      ctaLabel="Deploy Grid"
      payloadPrefix="AUTO_FUSION_GRID"
      fields={[
        {
          key: 'gridId',
          label: 'Grid Identifier',
          type: 'text',
          placeholder: 'grid-001',
          required: true,
        },
        {
          key: 'gridTopology',
          label: 'Grid Topology',
          type: 'select',
          options: [
            { label: 'Mesh', value: 'mesh' },
            { label: 'Hierarchical', value: 'hierarchical' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'fusionDomains',
          label: 'Fusion Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'autonomyLevel',
          label: 'Autonomy Level',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Semi', value: 'semi' },
            { label: 'Supervised', value: 'supervised' },
          ],
          required: true,
        },
        {
          key: 'gridPolicy',
          label: 'Grid Policy',
          type: 'textarea',
          placeholder: 'Grid rules and fusion coordination policies',
        },
      ]}
    />
  )
}

