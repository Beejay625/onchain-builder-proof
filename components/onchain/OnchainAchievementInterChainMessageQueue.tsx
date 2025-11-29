'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementInterChainMessageQueue(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Inter-Chain Message Queue"
      subtitle="Queues messages for cross-chain delivery"
      accent="blue"
      ctaLabel="Deploy Queue"
      payloadPrefix="INTERCHAIN_MSG_QUEUE"
      fields={[
        {
          key: 'queueId',
          label: 'Queue Identifier',
          type: 'text',
          placeholder: 'queue-001',
          required: true,
        },
        {
          key: 'sourceChain',
          label: 'Source Chain',
          type: 'text',
          placeholder: 'ethereum-mainnet',
          required: true,
        },
        {
          key: 'targetChain',
          label: 'Target Chain',
          type: 'text',
          placeholder: 'arbitrum-one',
          required: true,
        },
        {
          key: 'queueType',
          label: 'Queue Type',
          type: 'select',
          options: [
            { label: 'FIFO', value: 'fifo' },
            { label: 'Priority', value: 'priority' },
            { label: 'Weighted', value: 'weighted' },
          ],
          required: true,
        },
        {
          key: 'maxQueueSize',
          label: 'Max Queue Size',
          type: 'number',
          placeholder: '1000',
          required: true,
        },
        {
          key: 'queuePolicy',
          label: 'Queue Policy',
          type: 'textarea',
          placeholder: 'Message queue rules and delivery parameters',
        },
      ]}
    />
  )
}

