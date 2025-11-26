'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGuardianCareConsole(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Guardian Care Console"
      subtitle="Track guardian aftercare"
      accent="green"
      ctaLabel="Log Aftercare Task"
      payloadPrefix="CARE_CONSOLE"
      fields={[
        {
          key: 'guardian',
          label: 'Guardian',
          type: 'text',
          placeholder: 'guardian.eth',
          required: true,
        },
        {
          key: 'careTask',
          label: 'Aftercare Task',
          type: 'textarea',
          placeholder: 'Rest period, counseling, etc.',
          required: true,
        },
        {
          key: 'dueDate',
          label: 'Due Date',
          type: 'text',
          placeholder: '2025-01-20',
          required: true,
        },
        {
          key: 'proofHash',
          label: 'Proof Hash',
          type: 'text',
          placeholder: '0xproof',
        },
      ]}
    />
  )
}
