'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentCacheManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Cache Manager"
      subtitle="Cache manager with intelligent eviction"
      accent="amber"
      ctaLabel="Deploy Manager"
      payloadPrefix="INTELLIGENT_CACHE"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'cacheTypes',
          label: 'Cache Types',
          type: 'textarea',
          placeholder: 'state,transaction,metadata',
          required: true,
        },
        {
          key: 'evictionPolicy',
          label: 'Eviction Policy',
          type: 'select',
          options: [
            { label: 'LRU', value: 'lru' },
            { label: 'LFU', value: 'lfu' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'cacheSize',
          label: 'Cache Size (MB)',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Cache rules and eviction parameters',
        },
      ]}
    />
  )
}

