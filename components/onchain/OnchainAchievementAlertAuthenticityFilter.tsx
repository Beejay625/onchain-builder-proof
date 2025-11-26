'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAlertAuthenticityFilter(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Alert Authenticity Filter"
      subtitle="Score noisy alerts"
      accent="purple"
      ctaLabel="Log Verdict"
      payloadPrefix="ALERT_FILTER"
      fields=[
      {
              key: 'source',
              label: 'Alert Source',
              type: 'text',
              placeholder: 'uptime-bot',
              required: true,
            },
      {
              key: 'verdict',
              label: 'Verdict',
              type: 'select',
              options: [
          { label: 'Legit', value: 'legit' },
          { label: 'Suspect', value: 'suspect' },
          { label: 'False Positive', value: 'false_positive' },
        ],
              required: true,
            },
      {
              key: 'reviewer',
              label: 'Reviewer',
              type: 'text',
              placeholder: 'ops-reviewer',
              required: true,
            },
      {
              key: 'reason',
              label: 'Reason',
              type: 'textarea',
              placeholder: 'Context behind verdict',
              required: true,
            },
    ]
    />
  )
}
