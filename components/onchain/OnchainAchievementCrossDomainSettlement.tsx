'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossDomainSettlement(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Domain Settlement"
      subtitle="Settlement system for cross-domain transactions"
      accent="blue"
      ctaLabel="Initiate Settlement"
      payloadPrefix="XDOMAIN_SETTLE"
      fields={[
        {
          key: 'settlementId',
          label: 'Settlement Identifier',
          type: 'text',
          placeholder: 'settle-001',
          required: true,
        },
        {
          key: 'sourceDomain',
          label: 'Source Domain',
          type: 'text',
          placeholder: 'domain1',
          required: true,
        },
        {
          key: 'targetDomain',
          label: 'Target Domain',
          type: 'text',
          placeholder: 'domain2',
          required: true,
        },
        {
          key: 'assetType',
          label: 'Asset Type',
          type: 'text',
          placeholder: 'ETH',
          required: true,
        },
        {
          key: 'amount',
          label: 'Amount',
          type: 'text',
          placeholder: '1.5',
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
          key: 'finalityProof',
          label: 'Finality Proof Hash',
          type: 'text',
          placeholder: '0x...',
        },
      ]}
    />
  )
}

