'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPQKeyDerivation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="PQ Key Derivation"
      subtitle="Key derivation using post-quantum functions"
      accent="green"
      ctaLabel="Configure KDF"
      payloadPrefix="PQ_KDF"
      fields={[
        {
          key: 'kdfId',
          label: 'KDF Identifier',
          type: 'text',
          placeholder: 'kdf-001',
          required: true,
        },
        {
          key: 'kdfAlgorithm',
          label: 'KDF Algorithm',
          type: 'select',
          options: [
            { label: 'HKDF', value: 'hkdf' },
            { label: 'PBKDF2', value: 'pbkdf2' },
            { label: 'Argon2', value: 'argon2' },
          ],
          required: true,
        },
        {
          key: 'usageTracking',
          label: 'Usage Tracking',
          type: 'select',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' },
          ],
          required: true,
        },
        {
          key: 'kdfPolicy',
          label: 'KDF Policy',
          type: 'textarea',
          placeholder: 'Key derivation rules and usage parameters',
        },
      ]}
    />
  )
}

