'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGuardianPagingMatrix(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Guardian Paging Matrix"
      subtitle="Keep guardian coverage transparent"
      accent="violet"
      ctaLabel="Update Paging Matrix"
      payloadPrefix="PAGING_MATRIX"
      fields={[
        {
        key: 'guardian',
        label: 'Guardian Address',
        type: 'text',
        placeholder: '0xabc...',
        required: true,
        },
        {
        key: 'priority',
        label: 'Priority',
        type: 'select',
        options: [
        { label: 'P0', value: 'p0' },
        { label: 'P1', value: 'p1' },
        { label: 'P2', value: 'p2' },
        ],
        required: true,
        },
        {
        key: 'channel',
        label: 'Channel',
        type: 'select',
        options: [
        { label: 'Bridge', value: 'bridge' },
        { label: 'PagerDuty', value: 'pager' },
        { label: 'SMS', value: 'sms' },
        ],
        required: true,
        },
        {
        key: 'coverage',
        label: 'Coverage %',
        type: 'number',
        placeholder: '100',
        required: true,
        },
        {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Escalation caveats',
        },
      ]}
    />
  )
}
