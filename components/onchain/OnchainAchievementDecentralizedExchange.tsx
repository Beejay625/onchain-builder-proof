'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedExchange(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Exchange"
      subtitle="Decentralized exchange with order matching"
      accent="cyan"
      ctaLabel="Deploy Exchange"
      payloadPrefix="DEX_EXCHANGE"
      fields={[
        {
          key: 'exchangeId',
          label: 'Exchange Identifier',
          type: 'text',
          placeholder: 'exchange-001',
          required: true,
        },
        {
          key: 'supportedTokens',
          label: 'Supported Tokens',
          type: 'textarea',
          placeholder: 'token1,token2,token3',
          required: true,
        },
        {
          key: 'orderType',
          label: 'Order Type',
          type: 'select',
          options: [
            { label: 'Limit', value: 'limit' },
            { label: 'Market', value: 'market' },
            { label: 'Both', value: 'both' },
          ],
          required: true,
        },
        {
          key: 'tradingFee',
          label: 'Trading Fee (%)',
          type: 'number',
          placeholder: '0.3',
          required: true,
        },
        {
          key: 'exchangePolicy',
          label: 'Exchange Policy',
          type: 'textarea',
          placeholder: 'DEX rules and fee parameters',
        },
      ]}
    />
  )
}

