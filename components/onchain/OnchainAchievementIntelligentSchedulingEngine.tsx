'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentSchedulingEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Scheduling Engine"
      subtitle="Scheduling engine with intelligent optimization"
      accent="emerald"
      ctaLabel="Deploy Engine"
      payloadPrefix="INTELLIGENT_SCHEDULER"
      fields={[
        {
          key: 'engineId',
          label: 'Engine Identifier',
          type: 'text',
          placeholder: 'engine-001',
          required: true,
        },
        {
          key: 'scheduledTasks',
          label: 'Scheduled Task Types',
          type: 'textarea',
          placeholder: 'task1,task2,task3',
          required: true,
        },
        {
          key: 'schedulingAlgorithm',
          label: 'Scheduling Algorithm',
          type: 'select',
          options: [
            { label: 'Priority-Based', value: 'priority' },
            { label: 'Fair-Share', value: 'fair_share' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'optimizationGoal',
          label: 'Optimization Goal',
          type: 'select',
          options: [
            { label: 'Throughput', value: 'throughput' },
            { label: 'Latency', value: 'latency' },
            { label: 'Resource-Efficiency', value: 'resource_efficiency' },
          ],
          required: true,
        },
        {
          key: 'enginePolicy',
          label: 'Engine Policy',
          type: 'textarea',
          placeholder: 'Scheduling rules and optimization parameters',
        },
      ]}
    />
  )
}

