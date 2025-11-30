'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedRealEstatePlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Real Estate Platform"
      subtitle="Real estate platform with fractional ownership and property NFTs"
      accent="slate"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_REAL_ESTATE"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'ownershipModel',
          label: 'Ownership Model',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Fractional', value: 'fractional' },
            { label: 'Timeshare', value: 'timeshare' },
          ],
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Title Deed', value: 'title_deed' },
            { label: 'Survey', value: 'survey' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Real estate platform rules and ownership parameters',
        },
      ]}
    />
  )
}

