'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedEnergyTradingPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Energy Trading Platform"
      subtitle="Peer-to-peer energy trading with smart grid integration"
      accent="yellow"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_ENERGY"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'energyType',
          label: 'Energy Type',
          type: 'select',
          options: [
            { label: 'Solar', value: 'solar' },
            { label: 'Wind', value: 'wind' },
            { label: 'Hydro', value: 'hydro' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'tradingModel',
          label: 'Trading Model',
          type: 'select',
          options: [
            { label: 'Auction', value: 'auction' },
            { label: 'Fixed Price', value: 'fixed_price' },
            { label: 'Dynamic Pricing', value: 'dynamic' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Energy trading platform rules and pricing parameters',
        },
      ]}
    />
  )
}

