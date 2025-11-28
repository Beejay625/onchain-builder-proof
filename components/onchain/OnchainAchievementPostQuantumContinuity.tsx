'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostQuantumContinuity(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Quantum Continuity"
      subtitle="Continuity guarantees with post-quantum primitives"
      accent="purple"
      ctaLabel="Configure Continuity"
      payloadPrefix="PQ_CONTINUITY"
      fields={[
        {
          key: 'continuityId',
          label: 'Continuity Identifier',
          type: 'text',
          placeholder: 'continuity-001',
          required: true,
        },
        {
          key: 'securityModel',
          label: 'Security Model',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'migrationPath',
          label: 'Migration Path',
          type: 'textarea',
          placeholder: 'Migration strategy and timeline',
        },
        {
          key: 'continuityPolicy',
          label: 'Continuity Policy',
          type: 'textarea',
          placeholder: 'Continuity rules and migration parameters',
        },
      ]}
    />
  )
}

