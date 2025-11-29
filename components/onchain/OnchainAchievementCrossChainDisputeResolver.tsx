'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainDisputeResolver(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Dispute Resolver"
      subtitle="Resolves disputes across chains"
      accent="rose"
      ctaLabel="Initiate Resolution"
      payloadPrefix="XCHAIN_DISPUTE_RESOLVE"
      fields={[
        {
          key: 'resolverId',
          label: 'Resolver Identifier',
          type: 'text',
          placeholder: 'resolver-001',
          required: true,
        },
        {
          key: 'disputeChains',
          label: 'Dispute Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one',
          required: true,
        },
        {
          key: 'disputeType',
          label: 'Dispute Type',
          type: 'select',
          options: [
            { label: 'Transaction', value: 'transaction' },
            { label: 'State', value: 'state' },
            { label: 'Governance', value: 'governance' },
            { label: 'Security', value: 'security' },
          ],
          required: true,
        },
        {
          key: 'resolutionMechanism',
          label: 'Resolution Mechanism',
          type: 'select',
          options: [
            { label: 'Arbitration', value: 'arbitration' },
            { label: 'Mediation', value: 'mediation' },
            { label: 'Voting', value: 'voting' },
          ],
          required: true,
        },
        {
          key: 'resolverPolicy',
          label: 'Resolver Policy',
          type: 'textarea',
          placeholder: 'Dispute resolution rules and mechanism parameters',
        },
      ]}
    />
  )
}

