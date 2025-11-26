'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGuardianAftercarePortal(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Guardian Aftercare Portal"
      subtitle="Track aftercare promises"
      accent="green"
      ctaLabel="Log Aftercare"
      payloadPrefix="AFTERCARE_PORTAL"
      fields={[
        {
        key: 'guardian',
        label: 'Guardian',
        type: 'text',
        placeholder: 'guardian.eth',
        required: true,
        },
        {
        key: 'task',
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
        {
        key: 'owner',
        label: 'Owner',
        type: 'text',
        placeholder: 'ops-care',
        required: true,
        },
      ]}
    />
  )
}
