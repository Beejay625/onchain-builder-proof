'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionGovernanceOracle(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Governance Oracle"
      subtitle="Oracle for fusion governance decisions"
      accent="violet"
      ctaLabel="Query Oracle"
      payloadPrefix="FUSION_ORACLE"
      fields={[
        {
          key: 'oracleId',
          label: 'Oracle Identifier',
          type: 'text',
          placeholder: 'oracle-001',
          required: true,
        },
        {
          key: 'queryType',
          label: 'Query Type',
          type: 'select',
          options: [
            { label: 'Voting Result', value: 'voting_result' },
            { label: 'Proposal Status', value: 'proposal_status' },
            { label: 'Quorum Check', value: 'quorum_check' },
            { label: 'Consensus State', value: 'consensus_state' },
          ],
          required: true,
        },
        {
          key: 'targetDomains',
          label: 'Target Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2',
          required: true,
        },
        {
          key: 'queryHash',
          label: 'Query Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'responseFormat',
          label: 'Response Format',
          type: 'select',
          options: [
            { label: 'Boolean', value: 'boolean' },
            { label: 'Numeric', value: 'numeric' },
            { label: 'JSON', value: 'json' },
          ],
          required: true,
        },
        {
          key: 'oracleProof',
          label: 'Oracle Proof Hash',
          type: 'text',
          placeholder: '0x...',
        },
      ]}
    />
  )
}

