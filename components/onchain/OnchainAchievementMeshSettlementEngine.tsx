'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshSettlementEngine(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Settlement Engine"
      subtitle="Settlement engine for mesh network transactions"
      accent="blue"
      ctaLabel="Deploy Engine"
      payloadPrefix="MESH_SETTLE"
      fields={[
        {
          key: 'engineId',
          label: 'Engine Identifier',
          type: 'text',
          placeholder: 'engine-001',
          required: true,
        },
        {
          key: 'meshId',
          label: 'Mesh Network ID',
          type: 'text',
          placeholder: 'mesh-001',
          required: true,
        },
        {
          key: 'settlementMode',
          label: 'Settlement Mode',
          type: 'select',
          options: [
            { label: 'Atomic', value: 'atomic' },
            { label: 'Optimistic', value: 'optimistic' },
            { label: 'Delayed', value: 'delayed' },
          ],
          required: true,
        },
        {
          key: 'finalityTime',
          label: 'Finality Time (seconds)',
          type: 'number',
          placeholder: '12',
          required: true,
        },
        {
          key: 'challengeWindow',
          label: 'Challenge Window (seconds)',
          type: 'number',
          placeholder: '604800',
        },
        {
          key: 'settlementPolicy',
          label: 'Settlement Policy',
          type: 'textarea',
          placeholder: 'Settlement rules and validation criteria',
        },
      ]}
    />
  )
}

