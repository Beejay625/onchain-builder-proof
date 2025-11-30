'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedCharityPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Charity Platform"
      subtitle="Charity platform with transparent donation tracking and impact verification"
      accent="green"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_CHARITY"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'On-Chain', value: 'onchain' },
            { label: 'Oracle-Based', value: 'oracle' },
            { label: 'Multi-Party', value: 'multi_party' },
          ],
          required: true,
        },
        {
          key: 'transparencyLevel',
          label: 'Transparency Level',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Partial', value: 'partial' },
            { label: 'Selective', value: 'selective' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Charity platform rules and transparency parameters',
        },
      ]}
    />
  )
}

