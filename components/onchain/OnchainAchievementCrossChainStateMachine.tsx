'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainStateMachine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain State Machine"
      subtitle="State machine for cross-chain coordination"
      accent="emerald"
      ctaLabel="Deploy State Machine"
      payloadPrefix="STATE_MACHINE"
      fields={[
        {
          key: 'machineId',
          label: 'Machine Identifier',
          type: 'text',
          placeholder: 'state-machine-001',
          required: true,
        },
        {
          key: 'initialState',
          label: 'Initial State',
          type: 'text',
          placeholder: 'idle',
          required: true,
        },
        {
          key: 'stateTransitions',
          label: 'State Transitions',
          type: 'textarea',
          placeholder: 'idle->active,active->completed,active->failed',
          required: true,
        },
        {
          key: 'chainScope',
          label: 'Chain Scope',
          type: 'textarea',
          placeholder: 'ethereum,arbitrum,optimism',
          required: true,
        },
        {
          key: 'transitionConditions',
          label: 'Transition Conditions',
          type: 'textarea',
          placeholder: 'Condition definitions and validation rules',
        },
        {
          key: 'timeoutPolicy',
          label: 'Timeout Policy',
          type: 'textarea',
          placeholder: 'Timeout rules per state',
        },
      ]}
    />
  )
}

