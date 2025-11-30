'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedHealthcarePlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Healthcare Platform"
      subtitle="Healthcare platform with encrypted medical records and privacy-preserving access"
      accent="rose"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_HEALTHCARE"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'dataType',
          label: 'Data Type',
          type: 'select',
          options: [
            { label: 'Medical Records', value: 'medical_records' },
            { label: 'Prescriptions', value: 'prescriptions' },
            { label: 'Lab Results', value: 'lab_results' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'encryptionLevel',
          label: 'Encryption Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Standard', value: 'standard' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Healthcare platform rules and encryption parameters',
        },
      ]}
    />
  )
}

