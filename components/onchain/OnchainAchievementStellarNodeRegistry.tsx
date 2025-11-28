'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarNodeRegistry(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Node Registry"
      subtitle="Registry for stellar network node management"
      accent="blue"
      ctaLabel="Register Node"
      payloadPrefix="STELLAR_NODE_REG"
      fields={[
        {
          key: 'nodeId',
          label: 'Node Identifier',
          type: 'text',
          placeholder: 'node-001',
          required: true,
        },
        {
          key: 'nodeAddress',
          label: 'Node Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'nodeRole',
          label: 'Node Role',
          type: 'select',
          options: [
            { label: 'Validator', value: 'validator' },
            { label: 'Relay', value: 'relay' },
            { label: 'Observer', value: 'observer' },
            { label: 'Gateway', value: 'gateway' },
          ],
          required: true,
        },
        {
          key: 'status',
          label: 'Node Status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Pending', value: 'pending' },
          ],
          required: true,
        },
        {
          key: 'nodeMetadata',
          label: 'Node Metadata',
          type: 'textarea',
          placeholder: 'Node capabilities and configuration',
        },
      ]}
    />
  )
}

