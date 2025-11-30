'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedAIWorkforcePlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized AI Workforce Platform"
      subtitle="Platform for AI model training and inference with distributed workers"
      accent="violet"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_AI_WORKFORCE"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'workType',
          label: 'Work Type',
          type: 'select',
          options: [
            { label: 'Training', value: 'training' },
            { label: 'Inference', value: 'inference' },
            { label: 'Data Labeling', value: 'data_labeling' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'rewardModel',
          label: 'Reward Model',
          type: 'select',
          options: [
            { label: 'Per-Task', value: 'per_task' },
            { label: 'Per-Result', value: 'per_result' },
            { label: 'Performance-Based', value: 'performance' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'AI workforce platform rules and reward parameters',
        },
      ]}
    />
  )
}

