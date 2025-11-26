'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementChainAirgapSwitch(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Chain Airgap Switch"
      subtitle="Airgap compromised networks"
      accent="red"
      ctaLabel="Toggle Airgap"
      payloadPrefix="AIRGAP_SWITCH"
      fields={[
        {
          key: 'chain',
          label: 'Chain',
          type: 'text',
          placeholder: 'Base L3',
          required: true,
        },
        {
          key: 'state',
          label: 'State',
          type: 'select',
          options: [
            { label: 'Isolate', value: 'isolate' },
            { label: 'Reconnect', value: 'reconnect' },
          ],
          required: true,
        },
        {
          key: 'unlockConditions',
          label: 'Unlock Conditions',
          type: 'textarea',
          placeholder: 'Needs quorum + audit',
          required: true,
        },
        {
          key: 'reason',
          label: 'Reason',
          type: 'textarea',
          placeholder: 'Observed exploit campaign',
          required: true,
        },
      ]}
    />
  )
}
