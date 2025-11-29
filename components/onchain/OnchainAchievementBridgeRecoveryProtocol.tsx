'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeRecoveryProtocol(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Recovery Protocol"
      subtitle="Recovery protocol for bridge failures"
      accent="rose"
      ctaLabel="Deploy Protocol"
      payloadPrefix="BRIDGE_RECOVERY_PROTOCOL"
      fields={[
        {
          key: 'protocolId',
          label: 'Protocol Identifier',
          type: 'text',
          placeholder: 'protocol-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'recoveryStrategy',
          label: 'Recovery Strategy',
          type: 'select',
          options: [
            { label: 'Automatic', value: 'automatic' },
            { label: 'Semi-Automatic', value: 'semi_automatic' },
            { label: 'Manual', value: 'manual' },
          ],
          required: true,
        },
        {
          key: 'recoveryTime',
          label: 'Target Recovery Time (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'protocolPolicy',
          label: 'Protocol Policy',
          type: 'textarea',
          placeholder: 'Recovery protocol rules and time parameters',
        },
      ]}
    />
  )
}

