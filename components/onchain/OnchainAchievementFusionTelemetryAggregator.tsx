'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionTelemetryAggregator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Telemetry Aggregator"
      subtitle="Aggregate telemetry across fusion domains"
      accent="cyan"
      ctaLabel="Aggregate Telemetry"
      payloadPrefix="FUSION_TELEMETRY"
      fields={[
        {
          key: 'aggregatorId',
          label: 'Aggregator Identifier',
          type: 'text',
          placeholder: 'agg-001',
          required: true,
        },
        {
          key: 'sourceDomains',
          label: 'Source Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'aggregationWindow',
          label: 'Aggregation Window (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'metricTypes',
          label: 'Metric Types',
          type: 'textarea',
          placeholder: 'latency,throughput,error_rate',
          required: true,
        },
        {
          key: 'aggregationMethod',
          label: 'Aggregation Method',
          type: 'select',
          options: [
            { label: 'Sum', value: 'sum' },
            { label: 'Average', value: 'average' },
            { label: 'Max', value: 'max' },
            { label: 'Min', value: 'min' },
            { label: 'Percentile', value: 'percentile' },
          ],
          required: true,
        },
        {
          key: 'outputFormat',
          label: 'Output Format',
          type: 'select',
          options: [
            { label: 'JSON', value: 'json' },
            { label: 'Prometheus', value: 'prometheus' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
      ]}
    />
  )
}

