'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementLendingProtocolManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Lending Protocol Manager"
      subtitle="Manages lending protocol with interest rates and collateral"
      accent="indigo"
      ctaLabel="Deploy Protocol"
      payloadPrefix="LENDING_PROTOCOL"
      fields={[
        {
          key: 'protocolId',
          label: 'Protocol Identifier',
          type: 'text',
          placeholder: 'protocol-001',
          required: true,
        },
        {
          key: 'supportedAssets',
          label: 'Supported Assets',
          type: 'textarea',
          placeholder: 'ETH,USDC,DAI,WBTC',
          required: true,
        },
        {
          key: 'interestModel',
          label: 'Interest Model',
          type: 'select',
          options: [
            { label: 'Linear', value: 'linear' },
            { label: 'Exponential', value: 'exponential' },
            { label: 'Jump Rate', value: 'jump_rate' },
          ],
          required: true,
        },
        {
          key: 'collateralFactor',
          label: 'Collateral Factor (%)',
          type: 'number',
          placeholder: '75',
          required: true,
        },
        {
          key: 'protocolPolicy',
          label: 'Protocol Policy',
          type: 'textarea',
          placeholder: 'Lending protocol rules and interest parameters',
        },
      ]}
    />
  )
}

