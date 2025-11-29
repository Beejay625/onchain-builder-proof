'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainAuditTrail(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Audit Trail"
      subtitle="Audit trail for cross-chain operations"
      accent="slate"
      ctaLabel="Create Trail"
      payloadPrefix="XCHAIN_AUDIT_TRAIL"
      fields={[
        {
          key: 'trailId',
          label: 'Trail Identifier',
          type: 'text',
          placeholder: 'trail-001',
          required: true,
        },
        {
          key: 'monitoredChains',
          label: 'Monitored Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'auditScope',
          label: 'Audit Scope',
          type: 'textarea',
          placeholder: 'Operations,transactions,governance,security',
          required: true,
        },
        {
          key: 'retentionPolicy',
          label: 'Retention Policy',
          type: 'select',
          options: [
            { label: 'Short-term', value: 'short' },
            { label: 'Medium-term', value: 'medium' },
            { label: 'Long-term', value: 'long' },
            { label: 'Permanent', value: 'permanent' },
          ],
          required: true,
        },
        {
          key: 'trailPolicy',
          label: 'Trail Policy',
          type: 'textarea',
          placeholder: 'Audit trail rules and retention parameters',
        },
      ]}
    />
  )
}

