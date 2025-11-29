'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementOptionsTradingPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Options Trading Platform"
      subtitle="Decentralized options trading with strike prices and expiry"
      accent="amber"
      ctaLabel="Deploy Platform"
      payloadPrefix="OPTIONS_TRADING"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'underlyingAsset',
          label: 'Underlying Asset',
          type: 'text',
          placeholder: 'ETH',
          required: true,
        },
        {
          key: 'optionType',
          label: 'Option Type',
          type: 'select',
          options: [
            { label: 'Call', value: 'call' },
            { label: 'Put', value: 'put' },
            { label: 'Both', value: 'both' },
          ],
          required: true,
        },
        {
          key: 'expiryPeriod',
          label: 'Expiry Period (days)',
          type: 'number',
          placeholder: '30',
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Options trading rules and expiry parameters',
        },
      ]}
    />
  )
}

