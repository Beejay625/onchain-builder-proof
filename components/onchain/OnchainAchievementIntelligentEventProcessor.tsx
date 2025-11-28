'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentEventProcessor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Event Processor"
      subtitle="Event processor with intelligent routing"
      accent="purple"
      ctaLabel="Deploy Processor"
      payloadPrefix="INTELLIGENT_EVENT"
      fields={[
        {
          key: 'processorId',
          label: 'Processor Identifier',
          type: 'text',
          placeholder: 'processor-001',
          required: true,
        },
        {
          key: 'eventTypes',
          label: 'Event Types',
          type: 'textarea',
          placeholder: 'state_change,transaction,governance',
          required: true,
        },
        {
          key: 'processingMode',
          label: 'Processing Mode',
          type: 'select',
          options: [
            { label: 'Real-Time', value: 'realtime' },
            { label: 'Batch', value: 'batch' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'routingIntelligence',
          label: 'Routing Intelligence',
          type: 'select',
          options: [
            { label: 'ML-Based', value: 'ml_based' },
            { label: 'Rule-Based', value: 'rule_based' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'processorPolicy',
          label: 'Processor Policy',
          type: 'textarea',
          placeholder: 'Event processing rules and routing parameters',
        },
      ]}
    />
  )
}

