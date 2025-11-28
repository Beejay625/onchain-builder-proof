'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPQGovernanceProtocol(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="PQ Governance Protocol"
      subtitle="Governance using post-quantum signatures"
      accent="teal"
      ctaLabel="Deploy Protocol"
      payloadPrefix="PQ_GOV_PROTOCOL"
      fields={[
        {
          key: 'protocolId',
          label: 'Protocol Identifier',
          type: 'text',
          placeholder: 'protocol-001',
          required: true,
        },
        {
          key: 'votingScheme',
          label: 'Voting Scheme',
          type: 'select',
          options: [
            { label: 'One-Vote-Per-Address', value: 'one_per_address' },
            { label: 'Weighted', value: 'weighted' },
            { label: 'Quadratic', value: 'quadratic' },
          ],
          required: true,
        },
        {
          key: 'quorumEnforcement',
          label: 'Quorum Enforcement',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Flexible', value: 'flexible' },
          ],
          required: true,
        },
        {
          key: 'protocolPolicy',
          label: 'Protocol Policy',
          type: 'textarea',
          placeholder: 'Governance rules and quorum parameters',
        },
      ]}
    />
  )
}

