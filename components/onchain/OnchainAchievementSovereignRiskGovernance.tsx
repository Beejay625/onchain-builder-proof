'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignRiskGovernance(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Risk Governance"
      subtitle="Governance framework for sovereign risk management"
      accent="red"
      ctaLabel="Deploy Governance"
      payloadPrefix="SOV_RISK_GOV"
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
          key: 'riskCategories',
          label: 'Risk Categories',
          type: 'textarea',
          placeholder: 'technical,financial,operational,sovereignty',
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
          key: 'riskThresholds',
          label: 'Risk Thresholds',
          type: 'textarea',
          placeholder: 'Risk thresholds and escalation rules',
        },
      ]}
    />
  )
}

