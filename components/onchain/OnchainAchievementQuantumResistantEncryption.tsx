'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResistantEncryption(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resistant Encryption"
      subtitle="Encryption with post-quantum algorithms"
      accent="blue"
      ctaLabel="Configure Encryption"
      payloadPrefix="QRESISTANT_ENCRYPT"
      fields={[
        {
          key: 'encryptionId',
          label: 'Encryption Identifier',
          type: 'text',
          placeholder: 'encrypt-001',
          required: true,
        },
        {
          key: 'encryptionAlgorithm',
          label: 'Encryption Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'NTRU', value: 'ntru' },
            { label: 'McEliece', value: 'mceliece' },
          ],
          required: true,
        },
        {
          key: 'encryptionScheme',
          label: 'Encryption Scheme',
          type: 'select',
          options: [
            { label: 'Symmetric', value: 'symmetric' },
            { label: 'Asymmetric', value: 'asymmetric' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'keyManagement',
          label: 'Key Management',
          type: 'textarea',
          placeholder: 'Key management rules and policies',
        },
        {
          key: 'encryptionPolicy',
          label: 'Encryption Policy',
          type: 'textarea',
          placeholder: 'Encryption rules and algorithm parameters',
        },
      ]}
    />
  )
}

