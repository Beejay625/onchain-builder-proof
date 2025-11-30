'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementEigenDAIntegration(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="EigenDA Integration"
      subtitle="Integrates EigenDA for decentralized data availability"
      accent="indigo"
      ctaLabel="Configure Integration"
      payloadPrefix="EIGENDA_INTEGRATION"
      fields={[
        {
          key: 'integrationId',
          label: 'Integration Identifier',
          type: 'text',
          placeholder: 'integration-001',
          required: true,
        },
        {
          key: 'quorumThreshold',
          label: 'Quorum Threshold (%)',
          type: 'number',
          placeholder: '75',
          required: true,
        },
        {
          key: 'operatorCount',
          label: 'Operator Count',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'dataEncoding',
          label: 'Data Encoding',
          type: 'select',
          options: [
            { label: 'Reed-Solomon', value: 'reed_solomon' },
            { label: 'Erasure Coding', value: 'erasure_coding' },
          ],
          required: true,
        },
        {
          key: 'integrationPolicy',
          label: 'Integration Policy',
          type: 'textarea',
          placeholder: 'EigenDA integration rules and quorum parameters',
        },
      ]}
    />
  )
}

