'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainFraudDetection(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Fraud Detection"
      subtitle="Detects fraudulent cross-chain operations"
      accent="red"
      ctaLabel="Deploy Detector"
      payloadPrefix="XCHAIN_FRAUD_DETECT"
      fields={[
        {
          key: 'detectorId',
          label: 'Detector Identifier',
          type: 'text',
          placeholder: 'detector-001',
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
          key: 'detectionModel',
          label: 'Detection Model',
          type: 'select',
          options: [
            { label: 'ML-Based', value: 'ml_based' },
            { label: 'Rule-Based', value: 'rule_based' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'sensitivityLevel',
          label: 'Sensitivity Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'detectorPolicy',
          label: 'Detector Policy',
          type: 'textarea',
          placeholder: 'Fraud detection rules and sensitivity parameters',
        },
      ]}
    />
  )
}

