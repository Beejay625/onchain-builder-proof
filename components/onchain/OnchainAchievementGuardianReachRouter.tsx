'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementGuardianReachRouter(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Guardian Reach Router"
      subtitle="Rank guardian reachability"
      accent="violet"
      ctaLabel="Update Reach Score"
      payloadPrefix="REACH_ROUTER"
      fields={[
        {
          key: 'guardian',
          label: 'Guardian',
          type: 'text',
          placeholder: '0xabc...',
          required: true,
        },
        {
          key: 'reachScore',
          label: 'Reach Score',
          type: 'number',
          placeholder: '95',
          required: true,
        },
        {
          key: 'channel',
          label: 'Channel',
          type: 'select',
          options: [
            { label: 'Bridge', value: 'bridge' },
            { label: 'Signal', value: 'signal' },
            { label: 'Pager', value: 'pager' },
          ],
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
