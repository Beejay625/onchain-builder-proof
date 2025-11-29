'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTokenMintingController(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Token Minting Controller"
      subtitle="Controls token minting with rate limits and caps"
      accent="green"
      ctaLabel="Configure Controller"
      payloadPrefix="TOKEN_MINTING_CTRL"
      fields={[
        {
          key: 'controllerId',
          label: 'Controller Identifier',
          type: 'text',
          placeholder: 'controller-001',
          required: true,
        },
        {
          key: 'tokenAddress',
          label: 'Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'mintingType',
          label: 'Minting Type',
          type: 'select',
          options: [
            { label: 'Unlimited', value: 'unlimited' },
            { label: 'Capped', value: 'capped' },
            { label: 'Rate-Limited', value: 'rate_limited' },
          ],
          required: true,
        },
        {
          key: 'maxSupply',
          label: 'Max Supply',
          type: 'text',
          placeholder: '1000000000',
        },
        {
          key: 'mintingRate',
          label: 'Minting Rate (per day)',
          type: 'number',
          placeholder: '10000',
        },
        {
          key: 'controllerPolicy',
          label: 'Controller Policy',
          type: 'textarea',
          placeholder: 'Token minting rules and supply parameters',
        },
      ]}
    />
  )
}

