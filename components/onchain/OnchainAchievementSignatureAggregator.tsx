'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSignatureAggregator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Signature Aggregator"
      subtitle="Aggregates multiple signatures for batch verification"
      accent="purple"
      ctaLabel="Deploy Aggregator"
      payloadPrefix="SIGNATURE_AGGREGATOR"
      fields={[
        {
          key: 'aggregatorId',
          label: 'Aggregator Identifier',
          type: 'text',
          placeholder: 'agg-001',
          required: true,
        },
        {
          key: 'aggregationType',
          label: 'Aggregation Type',
          type: 'select',
          options: [
            { label: 'BLS', value: 'bls' },
            { label: 'Schnorr', value: 'schnorr' },
            { label: 'ECDSA', value: 'ecdsa' },
          ],
          required: true,
        },
        {
          key: 'maxSignatures',
          label: 'Max Signatures per Batch',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Batch', value: 'batch' },
            { label: 'Sequential', value: 'sequential' },
            { label: 'Parallel', value: 'parallel' },
          ],
          required: true,
        },
        {
          key: 'aggregatorPolicy',
          label: 'Aggregator Policy',
          type: 'textarea',
          placeholder: 'Signature aggregation rules and verification parameters',
        },
      ]}
    />
  )
}

