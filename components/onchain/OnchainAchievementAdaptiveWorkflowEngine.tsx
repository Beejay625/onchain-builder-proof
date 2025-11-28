'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveWorkflowEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Workflow Engine"
      subtitle="Workflow engine with adaptive execution"
      accent="indigo"
      ctaLabel="Deploy Engine"
      payloadPrefix="ADAPTIVE_WORKFLOW"
      fields={[
        {
          key: 'engineId',
          label: 'Engine Identifier',
          type: 'text',
          placeholder: 'engine-001',
          required: true,
        },
        {
          key: 'workflowTypes',
          label: 'Workflow Types',
          type: 'textarea',
          placeholder: 'workflow1,workflow2,workflow3',
          required: true,
        },
        {
          key: 'executionMode',
          label: 'Execution Mode',
          type: 'select',
          options: [
            { label: 'Sequential', value: 'sequential' },
            { label: 'Parallel', value: 'parallel' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'adaptationTrigger',
          label: 'Adaptation Trigger',
          type: 'select',
          options: [
            { label: 'Performance', value: 'performance' },
            { label: 'Failure', value: 'failure' },
            { label: 'Load', value: 'load' },
          ],
          required: true,
        },
        {
          key: 'enginePolicy',
          label: 'Engine Policy',
          type: 'textarea',
          placeholder: 'Workflow rules and adaptation parameters',
        },
      ]}
    />
  )
}

