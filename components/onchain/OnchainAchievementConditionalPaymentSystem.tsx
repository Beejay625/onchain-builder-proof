'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementConditionalPaymentSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Conditional Payment System"
      subtitle="Payments that execute based on predefined conditions"
      accent="blue"
      ctaLabel="Create Payment"
      payloadPrefix="CONDITIONAL_PAYMENT"
      fields={[
        {
          key: 'paymentId',
          label: 'Payment Identifier',
          type: 'text',
          placeholder: 'payment-001',
          required: true,
        },
        {
          key: 'conditionType',
          label: 'Condition Type',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Event-Based', value: 'event_based' },
            { label: 'Oracle-Based', value: 'oracle_based' },
            { label: 'Multi-Condition', value: 'multi' },
          ],
          required: true,
        },
        {
          key: 'paymentAmount',
          label: 'Payment Amount',
          type: 'text',
          placeholder: '1000000000000000000',
          required: true,
        },
        {
          key: 'recipient',
          label: 'Recipient Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'paymentPolicy',
          label: 'Payment Policy',
          type: 'textarea',
          placeholder: 'Conditional payment rules and condition parameters',
        },
      ]}
    />
  )
}

