'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveConfigurationManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Configuration Manager"
      subtitle="Configuration manager with adaptive updates"
      accent="teal"
      ctaLabel="Deploy Manager"
      payloadPrefix="ADAPTIVE_CONFIG"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'configurationScopes',
          label: 'Configuration Scopes',
          type: 'textarea',
          placeholder: 'scope1,scope2,scope3',
          required: true,
        },
        {
          key: 'updateStrategy',
          label: 'Update Strategy',
          type: 'select',
          options: [
            { label: 'Immediate', value: 'immediate' },
            { label: 'Rolling', value: 'rolling' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'validationMode',
          label: 'Validation Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Permissive', value: 'permissive' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Configuration rules and update parameters',
        },
      ]}
    />
  )
}

