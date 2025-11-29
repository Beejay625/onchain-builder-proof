'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiChainComplianceChecker(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Chain Compliance Checker"
      subtitle="Checks compliance across chains"
      accent="amber"
      ctaLabel="Deploy Checker"
      payloadPrefix="MULTICHAIN_COMPLIANCE"
      fields={[
        {
          key: 'checkerId',
          label: 'Checker Identifier',
          type: 'text',
          placeholder: 'checker-001',
          required: true,
        },
        {
          key: 'targetChains',
          label: 'Target Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'complianceStandards',
          label: 'Compliance Standards',
          type: 'textarea',
          placeholder: 'GDPR,CCPA,HIPAA,SOC2',
          required: true,
        },
        {
          key: 'checkFrequency',
          label: 'Check Frequency (seconds)',
          type: 'number',
          placeholder: '3600',
          required: true,
        },
        {
          key: 'checkerPolicy',
          label: 'Checker Policy',
          type: 'textarea',
          placeholder: 'Compliance checker rules and frequency parameters',
        },
      ]}
    />
  )
}

