'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionDataPipeline(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Data Pipeline"
      subtitle="Pipeline for fusing data across domains"
      accent="fuchsia"
      ctaLabel="Deploy Pipeline"
      payloadPrefix="FUSION_PIPELINE"
      fields={[
        {
          key: 'pipelineId',
          label: 'Pipeline Identifier',
          type: 'text',
          placeholder: 'pipeline-001',
          required: true,
        },
        {
          key: 'sourceDomains',
          label: 'Source Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2',
          required: true,
        },
        {
          key: 'targetDomain',
          label: 'Target Domain',
          type: 'text',
          placeholder: 'domain3',
          required: true,
        },
        {
          key: 'processingMode',
          label: 'Processing Mode',
          type: 'select',
          options: [
            { label: 'Streaming', value: 'streaming' },
            { label: 'Batch', value: 'batch' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'batchSize',
          label: 'Batch Size',
          type: 'number',
          placeholder: '100',
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

