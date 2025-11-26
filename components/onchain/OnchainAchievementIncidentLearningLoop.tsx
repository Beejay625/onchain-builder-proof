'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIncidentLearningLoop(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Incident Learning Loop"
      subtitle="Close the learning loop onchain"
      accent="violet"
      ctaLabel="Record Learning"
      payloadPrefix="LEARNING_LOOP"
      fields=[
      {
              key: 'hypothesis',
              label: 'Hypothesis',
              type: 'text',
              placeholder: 'Auto batching reduces error budget',
              required: true,
            },
      {
              key: 'result',
              label: 'Experiment Result',
              type: 'select',
              options: [
          { label: 'Pass', value: 'pass' },
          { label: 'Fail', value: 'fail' },
          { label: 'In Progress', value: 'in_progress' },
        ],
              required: true,
            },
      {
              key: 'adoption',
              label: 'Adoption Status',
              type: 'select',
              options: [
          { label: 'Adopted', value: 'adopted' },
          { label: 'Backlog', value: 'backlog' },
          { label: 'Discarded', value: 'discarded' },
        ],
              required: true,
            },
      {
              key: 'summary',
              label: 'Summary',
              type: 'textarea',
              placeholder: 'Highlights and owners',
              required: true,
            },
    ]
    />
  )
}
