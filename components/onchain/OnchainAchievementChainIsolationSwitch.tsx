'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementChainIsolationSwitch(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Chain Isolation Switch"
      subtitle="Quarantine compromised chains"
      accent="red"
      ctaLabel="Update Isolation"
      payloadPrefix="ISOLATION_SWITCH"
      fields=[
      {
              key: 'chain',
              label: 'Chain',
              type: 'text',
              placeholder: 'Base, L2 X',
              required: true,
            },
      {
              key: 'mode',
              label: 'Mode',
              type: 'select',
              options: [
          { label: 'Isolate', value: 'isolate' },
          { label: 'Rejoin', value: 'rejoin' },
        ],
              required: true,
            },
      {
              key: 'reason',
              label: 'Reason',
              type: 'textarea',
              placeholder: 'Observed exploit stream',
              required: true,
            },
      {
              key: 'rejoinPolicy',
              label: 'Rejoin Policy',
              type: 'textarea',
              placeholder: 'Health checks & quorum needed',
              required: true,
            },
    ]
    />
  )
}
