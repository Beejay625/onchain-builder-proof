'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIncidentEscalationChoreographer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Incident Escalation Choreographer"
      subtitle="Script deterministic escalation paths"
      accent="rose"
      ctaLabel="Log Escalation Step"
      payloadPrefix="ESCALATION_SCRIPT"
      fields={[
        {
        key: 'stage',
        label: 'Escalation Stage',
        type: 'select',
        options: [
        { label: 'Detection', value: 'detection' },
        { label: 'Containment', value: 'containment' },
        { label: 'Recovery', value: 'recovery' },
        { label: 'Retro', value: 'retro' },
        ],
        required: true,
        },
        {
        key: 'responder',
        label: 'Responder Handle',
        type: 'text',
        placeholder: '@guardian.ops',
        required: true,
        },
        {
        key: 'channel',
        label: 'Channel',
        type: 'select',
        options: [
        { label: 'Bridge', value: 'bridge' },
        { label: 'Pager', value: 'pager' },
        { label: 'Signal', value: 'signal' },
        ],
        required: true,
        },
        {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Approval route, fallback contact, etc.',
        required: true,
        },
      ]}
    />
  )
}
