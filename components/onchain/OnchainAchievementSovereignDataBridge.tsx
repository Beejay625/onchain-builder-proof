'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignDataBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Data Bridge"
      subtitle="Bridge sovereign data with jurisdiction compliance"
      accent="green"
      ctaLabel="Bridge Data"
      payloadPrefix="SOV_DATA_BRIDGE"
      fields={[
        {
          key: 'sourceJurisdiction',
          label: 'Source Jurisdiction',
          type: 'text',
          placeholder: 'EU',
          required: true,
        },
        {
          key: 'targetJurisdiction',
          label: 'Target Jurisdiction',
          type: 'text',
          placeholder: 'US',
          required: true,
        },
        {
          key: 'dataType',
          label: 'Data Type',
          type: 'select',
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Financial', value: 'financial' },
            { label: 'Operational', value: 'operational' },
            { label: 'Public', value: 'public' },
          ],
          required: true,
        },
        {
          key: 'complianceHash',
          label: 'Compliance Attestation Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'encryptionMethod',
          label: 'Encryption Method',
          type: 'select',
          options: [
            { label: 'AES-256', value: 'aes256' },
            { label: 'ChaCha20-Poly1305', value: 'chacha20' },
            { label: 'Quantum-Safe', value: 'quantum_safe' },
          ],
          required: true,
        },
        {
          key: 'bridgePolicy',
          label: 'Bridge Policy',
          type: 'textarea',
          placeholder: 'Data handling and retention policies',
        },
      ]}
    />
  )
}

