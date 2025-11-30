'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedEducationPlatform(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Education Platform"
      subtitle="Education platform with verifiable credentials and NFT certificates"
      accent="green"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_EDUCATION"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'credentialType',
          label: 'Credential Type',
          type: 'select',
          options: [
            { label: 'Certificate', value: 'certificate' },
            { label: 'Degree', value: 'degree' },
            { label: 'Badge', value: 'badge' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'On-Chain', value: 'onchain' },
            { label: 'Off-Chain', value: 'offchain' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'Education platform rules and credential parameters',
        },
      ]}
    />
  )
}

