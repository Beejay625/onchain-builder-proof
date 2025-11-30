'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFraudProofSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fraud Proof System"
      subtitle="Enables fraud proofs for optimistic rollups and state channels"
      accent="red"
      ctaLabel="Deploy System"
      payloadPrefix="FRAUD_PROOF_SYSTEM"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'proofType',
          label: 'Proof Type',
          type: 'select',
          options: [
            { label: 'Interactive', value: 'interactive' },
            { label: 'Non-Interactive', value: 'non_interactive' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'challengePeriod',
          label: 'Challenge Period (blocks)',
          type: 'number',
          placeholder: '7',
          required: true,
        },
        {
          key: 'bondAmount',
          label: 'Bond Amount',
          type: 'text',
          placeholder: '1000000',
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'Fraud proof rules and challenge parameters',
        },
      ]}
    />
  )
}

