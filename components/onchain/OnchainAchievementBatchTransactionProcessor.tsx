'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBatchTransactionProcessor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Batch Transaction Processor"
      subtitle="Processes multiple transactions in a single batch for gas efficiency"
      accent="blue"
      ctaLabel="Deploy Processor"
      payloadPrefix="BATCH_TX_PROCESSOR"
      fields={[
        {
          key: 'processorId',
          label: 'Processor Identifier',
          type: 'text',
          placeholder: 'processor-001',
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
          key: 'processingMode',
          label: 'Processing Mode',
          type: 'select',
          options: [
            { label: 'Sequential', value: 'sequential' },
            { label: 'Parallel', value: 'parallel' },
            { label: 'Optimized', value: 'optimized' },
          ],
          required: true,
        },
        {
          key: 'gasLimit',
          label: 'Gas Limit per Batch',
          type: 'number',
          placeholder: '5000000',
          required: true,
        },
        {
          key: 'processorPolicy',
          label: 'Processor Policy',
          type: 'textarea',
          placeholder: 'Batch processing rules and gas parameters',
        },
      ]}
    />
  )
}

