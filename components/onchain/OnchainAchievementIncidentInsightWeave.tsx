'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIncidentInsightWeave(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Incident Insight Weave"
      subtitle="Weave hypotheses across retros"
      accent="violet"
      ctaLabel="Record Insight Thread"
      payloadPrefix="INSIGHT_WEAVE"
      fields={[
        {
          key: 'hypothesis',
          label: 'Hypothesis',
          type: 'text',
          placeholder: 'Auto batching reduces errors',
          required: true,
        },
        {
          key: 'experiment',
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
      ]}
    />
  )
}
