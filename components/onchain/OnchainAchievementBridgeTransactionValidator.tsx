'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeTransactionValidator(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Transaction Validator"
      subtitle="Validates bridge transactions before execution"
      accent="amber"
      ctaLabel="Deploy Validator"
      payloadPrefix="BRIDGE_TX_VALIDATOR"
      fields={[
        {
          key: 'validatorId',
          label: 'Validator Identifier',
          type: 'text',
          placeholder: 'validator-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'validationRules',
          label: 'Validation Rules',
          type: 'textarea',
          placeholder: 'Transaction validation rules and constraints',
          required: true,
        },
        {
          key: 'validationMode',
          label: 'Validation Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Standard', value: 'standard' },
            { label: 'Permissive', value: 'permissive' },
          ],
          required: true,
        },
        {
          key: 'validatorPolicy',
          label: 'Validator Policy',
          type: 'textarea',
          placeholder: 'Transaction validator rules and mode parameters',
        },
      ]}
    />
  )
}

