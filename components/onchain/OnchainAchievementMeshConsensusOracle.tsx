'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshConsensusOracle(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Consensus Oracle"
      subtitle="Oracle for mesh network consensus decisions"
      accent="orange"
      ctaLabel="Deploy Oracle"
      payloadPrefix="MESH_CONSENSUS"
      fields={[
        {
          key: 'oracleId',
          label: 'Oracle Identifier',
          type: 'text',
          placeholder: 'oracle-001',
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
          key: 'consensusType',
          label: 'Consensus Type',
          type: 'select',
          options: [
            { label: 'BFT', value: 'bft' },
            { label: 'Raft', value: 'raft' },
            { label: 'PBFT', value: 'pbft' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'quorumSize',
          label: 'Quorum Size',
          type: 'number',
          placeholder: '5',
          required: true,
        },
        {
          key: 'finalityThreshold',
          label: 'Finality Threshold (%)',
          type: 'number',
          placeholder: '67',
          required: true,
        },
        {
          key: 'oraclePolicy',
          label: 'Oracle Policy',
          type: 'textarea',
          placeholder: 'Consensus rules and validation criteria',
        },
      ]}
    />
  )
}

