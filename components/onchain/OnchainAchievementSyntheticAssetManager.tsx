'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSyntheticAssetManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Synthetic Asset Manager"
      subtitle="Manages synthetic assets with collateralization and minting"
      accent="violet"
      ctaLabel="Deploy Manager"
      payloadPrefix="SYNTHETIC_ASSET"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'syntheticAsset',
          label: 'Synthetic Asset Name',
          type: 'text',
          placeholder: 'sETH',
          required: true,
        },
        {
          key: 'collateralType',
          label: 'Collateral Type',
          type: 'select',
          options: [
            { label: 'Single', value: 'single' },
            { label: 'Multi', value: 'multi' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'collateralRatio',
          label: 'Collateral Ratio (%)',
          type: 'number',
          placeholder: '150',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Synthetic asset rules and collateral parameters',
        },
      ]}
    />
  )
}

