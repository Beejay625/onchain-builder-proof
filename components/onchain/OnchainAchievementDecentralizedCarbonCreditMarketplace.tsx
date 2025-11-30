'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedCarbonCreditMarketplace(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Carbon Credit Marketplace"
      subtitle="Marketplace for trading verified carbon credits"
      accent="green"
      ctaLabel="Deploy Marketplace"
      payloadPrefix="DECENTRALIZED_CARBON_CREDIT"
      fields={[
        {
          key: 'marketplaceId',
          label: 'Marketplace Identifier',
          type: 'text',
          placeholder: 'marketplace-001',
          required: true,
        },
        {
          key: 'verificationStandard',
          label: 'Verification Standard',
          type: 'select',
          options: [
            { label: 'VCS', value: 'vcs' },
            { label: 'Gold Standard', value: 'gold_standard' },
            { label: 'CAR', value: 'car' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'creditType',
          label: 'Credit Type',
          type: 'select',
          options: [
            { label: 'Reduction', value: 'reduction' },
            { label: 'Removal', value: 'removal' },
            { label: 'Offset', value: 'offset' },
          ],
          required: true,
        },
        {
          key: 'marketplacePolicy',
          label: 'Marketplace Policy',
          type: 'textarea',
          placeholder: 'Carbon credit marketplace rules and verification parameters',
        },
      ]}
    />
  )
}

