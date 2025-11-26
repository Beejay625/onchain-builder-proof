'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignExecutionLayer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Execution Layer"
      subtitle="Sovereign execution layer for cross-domain operations"
      accent="violet"
      ctaLabel="Deploy Execution Layer"
      payloadPrefix="SOV_EXEC"
      fields={[
        {
          key: 'layerId',
          label: 'Layer Identifier',
          type: 'text',
          placeholder: 'exec-layer-001',
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
          key: 'supportedDomains',
          label: 'Supported Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'finalityTime',
          label: 'Finality Time (seconds)',
          type: 'number',
          placeholder: '12',
          required: true,
        },
        {
          key: 'challengeWindow',
          label: 'Challenge Window (seconds)',
          type: 'number',
          placeholder: '604800',
        },
        {
          key: 'executionPolicy',
          label: 'Execution Policy',
          type: 'textarea',
          placeholder: 'Execution rules and constraints',
        },
      ]}
    />
  )
}

