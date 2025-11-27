'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignExecutionEnvironment(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Execution Environment"
      subtitle="Execution environment for sovereign operations"
      accent="indigo"
      ctaLabel="Deploy Environment"
      payloadPrefix="SOV_EXEC_ENV"
      fields={[
        {
          key: 'environmentId',
          label: 'Environment Identifier',
          type: 'text',
          placeholder: 'env-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2',
          required: true,
        },
        {
          key: 'executionModel',
          label: 'Execution Model',
          type: 'select',
          options: [
            { label: 'Deterministic', value: 'deterministic' },
            { label: 'Optimistic', value: 'optimistic' },
            { label: 'ZK-based', value: 'zk' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'isolationLevel',
          label: 'Isolation Level',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Partial', value: 'partial' },
            { label: 'Shared', value: 'shared' },
          ],
          required: true,
        },
        {
          key: 'environmentPolicy',
          label: 'Environment Policy',
          type: 'textarea',
          placeholder: 'Execution rules and sovereignty boundaries',
        },
      ]}
    />
  )
}

