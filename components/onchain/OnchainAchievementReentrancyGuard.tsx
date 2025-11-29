'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementReentrancyGuard(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Reentrancy Guard"
      subtitle="Protects contracts against reentrancy attacks"
      accent="orange"
      ctaLabel="Deploy Guard"
      payloadPrefix="REENTRANCY_GUARD"
      fields={[
        {
          key: 'guardId',
          label: 'Guard Identifier',
          type: 'text',
          placeholder: 'guard-001',
          required: true,
        },
        {
          key: 'protectedContract',
          label: 'Protected Contract',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'guardType',
          label: 'Guard Type',
          type: 'select',
          options: [
            { label: 'Mutex', value: 'mutex' },
            { label: 'Checks-Effects-Interactions', value: 'cei' },
            { label: 'Pull Payment', value: 'pull_payment' },
          ],
          required: true,
        },
        {
          key: 'enforcementMode',
          label: 'Enforcement Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Standard', value: 'standard' },
            { label: 'Permissive', value: 'permissive' },
          ],
          required: true,
        },
        {
          key: 'guardPolicy',
          label: 'Guard Policy',
          type: 'textarea',
          placeholder: 'Reentrancy guard rules and enforcement parameters',
        },
      ]}
    />
  )
}

