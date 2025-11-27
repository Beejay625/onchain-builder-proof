'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignDataGovernance(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Data Governance"
      subtitle="Data governance framework for sovereign operations"
      accent="green"
      ctaLabel="Deploy Governance"
      payloadPrefix="SOV_DATA_GOV"
      fields={[
        {
          key: 'governanceId',
          label: 'Governance Identifier',
          type: 'text',
          placeholder: 'gov-001',
          required: true,
        },
        {
          key: 'sovereigntyScope',
          label: 'Sovereignty Scope',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'dataCategories',
          label: 'Data Categories',
          type: 'textarea',
          placeholder: 'personal,financial,operational,sovereign',
          required: true,
        },
        {
          key: 'governanceModel',
          label: 'Governance Model',
          type: 'select',
          options: [
            { label: 'Centralized', value: 'centralized' },
            { label: 'Distributed', value: 'distributed' },
            { label: 'Federated', value: 'federated' },
          ],
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
          key: 'governancePolicy',
          label: 'Governance Policy',
          type: 'textarea',
          placeholder: 'Data governance rules and sovereignty requirements',
        },
      ]}
    />
  )
}

