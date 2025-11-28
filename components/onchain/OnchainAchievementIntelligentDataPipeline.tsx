'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentDataPipeline(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Data Pipeline"
      subtitle="Data pipeline with intelligent processing"
      accent="green"
      ctaLabel="Deploy Pipeline"
      payloadPrefix="INTELLIGENT_PIPELINE"
      fields={[
        {
          key: 'pipelineId',
          label: 'Pipeline Identifier',
          type: 'text',
          placeholder: 'pipeline-001',
          required: true,
        },
        {
          key: 'dataSources',
          label: 'Data Sources',
          type: 'textarea',
          placeholder: 'source1,source2,source3',
          required: true,
        },
        {
          key: 'processingMode',
          label: 'Processing Mode',
          type: 'select',
          options: [
            { label: 'Streaming', value: 'streaming' },
            { label: 'Batch', value: 'batch' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'transformationRules',
          label: 'Transformation Rules',
          type: 'textarea',
          placeholder: 'Data transformation and validation rules',
        },
      ]}
    />
  )
}

