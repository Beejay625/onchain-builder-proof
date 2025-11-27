'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusSettlementProtocol(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Settlement Protocol"
      subtitle="Settlement protocol for nexus network transactions"
      accent="blue"
      ctaLabel="Deploy Protocol"
      payloadPrefix="NEXUS_SETTLE"
      fields={[
        {
          key: 'protocolId',
          label: 'Protocol Identifier',
          type: 'text',
          placeholder: 'protocol-001',
          required: true,
        },
        {
          key: 'nexusId',
          label: 'Nexus Network ID',
          type: 'text',
          placeholder: 'nexus-001',
          required: true,
        },
        {
          key: 'settlementType',
          label: 'Settlement Type',
          type: 'select',
          options: [
            { label: 'Atomic', value: 'atomic' },
            { label: 'Optimistic', value: 'optimistic' },
            { label: 'Delayed', value: 'delayed' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'finalityMechanism',
          label: 'Finality Mechanism',
          type: 'select',
          options: [
            { label: 'Immediate', value: 'immediate' },
            { label: 'Probabilistic', value: 'probabilistic' },
            { label: 'Absolute', value: 'absolute' },
          ],
          required: true,
        },
        {
          key: 'protocolPolicy',
          label: 'Protocol Policy',
          type: 'textarea',
          placeholder: 'Settlement rules and finality guarantees',
        },
      ]}
    />
  )
}

