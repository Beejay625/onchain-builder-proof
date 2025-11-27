'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumEncryptionService(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Encryption Service"
      subtitle="Encryption service with quantum-resistant algorithms"
      accent="violet"
      ctaLabel="Deploy Service"
      payloadPrefix="QENCRYPT"
      fields={[
        {
          key: 'serviceId',
          label: 'Service Identifier',
          type: 'text',
          placeholder: 'service-001',
          required: true,
        },
        {
          key: 'encryptionAlgorithm',
          label: 'Encryption Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
          ],
          required: true,
        },
        {
          key: 'keyManagement',
          label: 'Key Management',
          type: 'select',
          options: [
            { label: 'Centralized', value: 'centralized' },
            { label: 'Distributed', value: 'distributed' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'encryptionMode',
          label: 'Encryption Mode',
          type: 'select',
          options: [
            { label: 'Symmetric', value: 'symmetric' },
            { label: 'Asymmetric', value: 'asymmetric' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'servicePolicy',
          label: 'Service Policy',
          type: 'textarea',
          placeholder: 'Encryption service rules and policies',
        },
      ]}
    />
  )
}

