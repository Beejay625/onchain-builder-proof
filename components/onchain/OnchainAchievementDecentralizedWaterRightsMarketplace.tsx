'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedWaterRightsMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Water Rights Marketplace"
      subtitle="Marketplace for trading water rights with regulatory compliance"
      accent="blue"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_WATER_RIGHTS"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'rightsType',
          label: 'Rights Type',
          type: 'select',
          options: [
            { label: 'Surface Water', value: 'surface' },
            { label: 'Groundwater', value: 'groundwater' },
            { label: 'Riparian', value: 'riparian' },
          ],
          required: true,
        },
        {
          key: 'jurisdiction',
          label: 'Jurisdiction',
          type: 'text',
          placeholder: 'California, USA',
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Water rights marketplace rules and jurisdiction parameters',
        },
      ]}
    />
  )
}

