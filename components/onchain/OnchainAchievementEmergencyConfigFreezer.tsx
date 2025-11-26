'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementEmergencyConfigFreezer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Emergency Config Freezer"
      subtitle="Freeze risky config scopes"
      accent="red"
      ctaLabel="Freeze Config"
      payloadPrefix="CONFIG_FREEZER"
      fields=[
      {
              key: 'configScope',
              label: 'Config Scope',
              type: 'text',
              placeholder: 'payouts.yaml',
              required: true,
            },
      {
              key: 'freezeState',
              label: 'Freeze State',
              type: 'select',
              options: [
          { label: 'Frozen', value: 'frozen' },
          { label: 'Thaw Request', value: 'thaw_request' },
        ],
              required: true,
            },
      {
              key: 'blastZone',
              label: 'Blast Zone',
              type: 'text',
              placeholder: 'vault-ops',
              required: true,
            },
      {
              key: 'thawPolicy',
              label: 'Thaw Policy',
              type: 'textarea',
              placeholder: 'Required checks before release',
              required: true,
            },
    ]
    />
  )
}
