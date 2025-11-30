'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSlashingConditionManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Slashing Condition Manager"
      subtitle="Manages slashing conditions for validator misbehavior"
      accent="rose"
      ctaLabel="Configure Slashing"
      payloadPrefix="SLASHING_CONDITION"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'slashingType',
          label: 'Slashing Type',
          type: 'select',
          options: [
            { label: 'Double Signing', value: 'double_signing' },
            { label: 'Downtime', value: 'downtime' },
            { label: 'Byzantine', value: 'byzantine' },
            { label: 'Multi-Type', value: 'multi' },
          ],
          required: true,
        },
        {
          key: 'slashingPercentage',
          label: 'Slashing Percentage (%)',
          type: 'number',
          placeholder: '5',
          required: true,
        },
        {
          key: 'jailDuration',
          label: 'Jail Duration (blocks)',
          type: 'number',
          placeholder: '10000',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Slashing condition rules and penalty parameters',
        },
      ]}
    />
  )
}

