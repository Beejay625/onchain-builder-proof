'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveResourceGovernor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Resource Governor"
      subtitle="Governor for adaptive resource management"
      accent="orange"
      ctaLabel="Deploy Governor"
      payloadPrefix="ADAPTIVE_RESOURCE_GOV"
      fields={[
        {
          key: 'governorId',
          label: 'Governor Identifier',
          type: 'text',
          placeholder: 'governor-001',
          required: true,
        },
        {
          key: 'governedResources',
          label: 'Governed Resources',
          type: 'textarea',
          placeholder: 'resource1,resource2,resource3',
          required: true,
        },
        {
          key: 'governanceMode',
          label: 'Governance Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Flexible', value: 'flexible' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'allocationPolicy',
          label: 'Allocation Policy',
          type: 'select',
          options: [
            { label: 'Fair', value: 'fair' },
            { label: 'Priority-Based', value: 'priority' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'governorPolicy',
          label: 'Governor Policy',
          type: 'textarea',
          placeholder: 'Resource governance rules and allocation parameters',
        },
      ]}
    />
  )
}

