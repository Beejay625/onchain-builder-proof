'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFlashLoanProtection(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Flash Loan Protection"
      subtitle="Protects against flash loan attacks with validation"
      accent="red"
      ctaLabel="Deploy Protection"
      payloadPrefix="FLASH_LOAN_PROTECT"
      fields={[
        {
          key: 'protectionId',
          label: 'Protection Identifier',
          type: 'text',
          placeholder: 'protection-001',
          required: true,
        },
        {
          key: 'protectedContract',
          label: 'Protected Contract',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'protectionLevel',
          label: 'Protection Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'validationWindow',
          label: 'Validation Window (blocks)',
          type: 'number',
          placeholder: '1',
          required: true,
        },
        {
          key: 'protectionPolicy',
          label: 'Protection Policy',
          type: 'textarea',
          placeholder: 'Flash loan protection rules and validation parameters',
        },
      ]}
    />
  )
}

