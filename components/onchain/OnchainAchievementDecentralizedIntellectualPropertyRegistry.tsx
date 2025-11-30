'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedIntellectualPropertyRegistry(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Intellectual Property Registry"
      subtitle="Registry for registering and managing intellectual property rights"
      accent="indigo"
      ctaLabel="Deploy Registry"
      payloadPrefix="DECENTRALIZED_IP_REGISTRY"
      fields={[
        {
          key: 'registryId',
          label: 'Registry Identifier',
          type: 'text',
          placeholder: 'registry-001',
          required: true,
        },
        {
          key: 'ipType',
          label: 'IP Type',
          type: 'select',
          options: [
            { label: 'Patent', value: 'patent' },
            { label: 'Copyright', value: 'copyright' },
            { label: 'Trademark', value: 'trademark' },
            { label: 'Trade Secret', value: 'trade_secret' },
          ],
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Hash-Based', value: 'hash_based' },
            { label: 'Timestamp', value: 'timestamp' },
            { label: 'Notarization', value: 'notarization' },
          ],
          required: true,
        },
        {
          key: 'registryPolicy',
          label: 'Registry Policy',
          type: 'textarea',
          placeholder: 'IP registry rules and verification parameters',
        },
      ]}
    />
  )
}

