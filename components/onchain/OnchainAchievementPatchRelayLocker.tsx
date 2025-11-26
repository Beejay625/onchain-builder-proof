'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPatchRelayLocker(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Patch Relay Locker"
      subtitle="Control emergency patch drops"
      accent="fuchsia"
      ctaLabel="Lock Patch Relay"
      payloadPrefix="PATCH_LOCKER"
      fields={[
        {
          key: 'lockerId',
          label: 'Locker ID',
          type: 'text',
          placeholder: 'locker-4',
          required: true,
        },
        {
          key: 'patchHash',
          label: 'Patch Hash',
          type: 'text',
          placeholder: '0xpatch',
          required: true,
        },
        {
          key: 'target',
          label: 'Target Environment',
          type: 'select',
          options: [
            { label: 'Staging', value: 'staging' },
            { label: 'Canary', value: 'canary' },
            { label: 'Production', value: 'production' },
          ],
          required: true,
        },
        {
          key: 'riskLevel',
          label: 'Risk Level',
          type: 'select',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ],
          required: true,
        },
      ]}
    />
  )
}
