'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedInsurancePlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Insurance Platform"
      subtitle="Insurance platform with parametric insurance and automated claims"
      accent="blue"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_INSURANCE"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'insuranceType',
          label: 'Insurance Type',
          type: 'select',
          options: [
            { label: 'Parametric', value: 'parametric' },
            { label: 'Traditional', value: 'traditional' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'claimsProcessing',
          label: 'Claims Processing',
          type: 'select',
          options: [
            { label: 'Automated', value: 'automated' },
            { label: 'Manual', value: 'manual' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Insurance platform rules and claims parameters',
        },
      ]}
    />
  )
}

