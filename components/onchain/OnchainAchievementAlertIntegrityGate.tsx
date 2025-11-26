'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAlertIntegrityGate(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Alert Integrity Gate"
      subtitle="Score noisy alerts"
      accent="purple"
      ctaLabel="Log Alert Verdict"
      payloadPrefix="INTEGRITY_GATE"
      fields={[
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
          key: 'confidence',
          label: 'Confidence',
          type: 'select',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ],
          required: true,
        },
        {
          key: 'rationale',
          label: 'Rationale',
          type: 'textarea',
          placeholder: 'Context behind verdict',
          required: true,
        },
      ]}
    />
  )
}
