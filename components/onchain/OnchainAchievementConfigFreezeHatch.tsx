'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementConfigFreezeHatch(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Config Freeze Hatch"
      subtitle="Freeze and thaw risky configs"
      accent="red"
      ctaLabel="Toggle Freeze Hatch"
      payloadPrefix="FREEZE_HATCH"
      fields={[
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
          key: 'thawPlan',
          label: 'Thaw Plan',
          type: 'textarea',
          placeholder: 'Checks before release',
          required: true,
        },
      ]}
    />
  )
}
