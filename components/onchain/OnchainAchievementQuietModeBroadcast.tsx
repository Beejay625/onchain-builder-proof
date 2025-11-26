'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuietModeBroadcast(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quiet Mode Broadcast"
      subtitle="Declare quiet hours onchain"
      accent="rose"
      ctaLabel="Activate Quiet Mode"
      payloadPrefix="QUIET_MODE"
      fields={[
        {
        key: 'scope',
        label: 'Scope',
        type: 'text',
        placeholder: 'all deploys',
        required: true,
        },
        {
        key: 'reason',
        label: 'Reason',
        type: 'textarea',
        placeholder: 'Need stability for investigation',
        required: true,
        },
        {
        key: 'expiresAt',
        label: 'Expires At',
        type: 'text',
        placeholder: '2025-01-13T05:00Z',
        required: true,
        },
        {
        key: 'approver',
        label: 'Approver',
        type: 'text',
        placeholder: 'guardian council',
        required: true,
        },
      ]}
    />
  )
}
