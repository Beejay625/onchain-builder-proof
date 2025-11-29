'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementInsurancePoolManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Insurance Pool Manager"
      subtitle="Manages insurance pools with risk assessment and claims"
      accent="rose"
      ctaLabel="Create Pool"
      payloadPrefix="INSURANCE_POOL"
      fields={[
        {
          key: 'poolId',
          label: 'Pool Identifier',
          type: 'text',
          placeholder: 'pool-001',
          required: true,
        },
        {
          key: 'coverageType',
          label: 'Coverage Type',
          type: 'select',
          options: [
            { label: 'Smart Contract', value: 'smart_contract' },
            { label: 'DeFi Protocol', value: 'defi_protocol' },
            { label: 'Custody', value: 'custody' },
            { label: 'Multi-Coverage', value: 'multi' },
          ],
          required: true,
        },
        {
          key: 'premiumRate',
          label: 'Premium Rate (%)',
          type: 'number',
          placeholder: '2.5',
          required: true,
        },
        {
          key: 'coverageLimit',
          label: 'Coverage Limit',
          type: 'text',
          placeholder: '1000000',
          required: true,
        },
        {
          key: 'poolPolicy',
          label: 'Pool Policy',
          type: 'textarea',
          placeholder: 'Insurance pool rules and coverage parameters',
        },
      ]}
    />
  )
}

