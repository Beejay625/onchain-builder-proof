'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainAttestationHub(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Attestation Hub"
      subtitle="Hub for cross-chain attestation routing"
      accent="blue"
      ctaLabel="Register Hub"
      payloadPrefix="ATTEST_HUB"
      fields={[
        {
          key: 'hubAddress',
          label: 'Hub Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'supportedChains',
          label: 'Supported Chains',
          type: 'textarea',
          placeholder: 'ethereum,arbitrum,optimism,base',
          required: true,
        },
        {
          key: 'attestationType',
          label: 'Attestation Type',
          type: 'select',
          options: [
            { label: 'EAS', value: 'eas' },
            { label: 'Verax', value: 'verax' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'routingPolicy',
          label: 'Routing Policy',
          type: 'select',
          options: [
            { label: 'Broadcast', value: 'broadcast' },
            { label: 'Selective', value: 'selective' },
            { label: 'On-demand', value: 'ondemand' },
          ],
          required: true,
        },
        {
          key: 'metadata',
          label: 'Hub Metadata',
          type: 'textarea',
          placeholder: 'Hub configuration and capabilities',
        },
      ]}
    />
  )
}

