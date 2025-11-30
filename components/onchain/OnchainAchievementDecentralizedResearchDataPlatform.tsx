'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedResearchDataPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Research Data Platform"
      subtitle="Platform for sharing and monetizing research data with attribution"
      accent="rose"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_RESEARCH_DATA"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'dataCategory',
          label: 'Data Category',
          type: 'select',
          options: [
            { label: 'Scientific', value: 'scientific' },
            { label: 'Medical', value: 'medical' },
            { label: 'Environmental', value: 'environmental' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'accessModel',
          label: 'Access Model',
          type: 'select',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Restricted', value: 'restricted' },
            { label: 'Pay-Per-Access', value: 'pay_per_access' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Research data platform rules and access parameters',
        },
      ]}
    />
  )
}

