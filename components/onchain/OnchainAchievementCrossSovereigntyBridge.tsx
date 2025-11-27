'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossSovereigntyBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Sovereignty Bridge"
      subtitle="Bridge operations across sovereign boundaries"
      accent="blue"
      ctaLabel="Deploy Bridge"
      payloadPrefix="XSOV_BRIDGE"
      fields={[
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'sourceSovereignty',
          label: 'Source Sovereignty',
          type: 'text',
          placeholder: 'sovereignty1',
          required: true,
        },
        {
          key: 'targetSovereignty',
          label: 'Target Sovereignty',
          type: 'text',
          placeholder: 'sovereignty2',
          required: true,
        },
        {
          key: 'bridgeType',
          label: 'Bridge Type',
          type: 'select',
          options: [
            { label: 'Trustless', value: 'trustless' },
            { label: 'Federated', value: 'federated' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'complianceAttestation',
          label: 'Compliance Attestation Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'bridgePolicy',
          label: 'Bridge Policy',
          type: 'textarea',
          placeholder: 'Bridge rules and sovereignty compliance',
        },
      ]}
    />
  )
}

