'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionOrchestrationHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Orchestration Hub"
      subtitle="Central hub for orchestrating fusion operations"
      accent="purple"
      ctaLabel="Register Hub"
      payloadPrefix="FUSION_HUB"
      fields={[
        {
          key: 'hubId',
          label: 'Hub Identifier',
          type: 'text',
          placeholder: 'hub-001',
          required: true,
        },
        {
          key: 'supportedFusionTypes',
          label: 'Supported Fusion Types',
          type: 'textarea',
          placeholder: 'state,governance,treasury,identity',
          required: true,
        },
        {
          key: 'coordinationPolicy',
          label: 'Coordination Policy',
          type: 'select',
          options: [
            { label: 'Centralized', value: 'centralized' },
            { label: 'Distributed', value: 'distributed' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'hubAddress',
          label: 'Hub Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'participantDomains',
          label: 'Participant Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'hubMetadata',
          label: 'Hub Metadata',
          type: 'textarea',
          placeholder: 'Hub capabilities and configuration',
        },
      ]}
    />
  )
}

