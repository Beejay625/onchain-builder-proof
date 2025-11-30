'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedMedicalRecordExchange(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Medical Record Exchange"
      subtitle="Secure exchange of medical records with patient consent"
      accent="rose"
      ctaLabel="Deploy Exchange"
      payloadPrefix="DECENTRALIZED_MEDICAL_RECORD"
      fields={[
        {
          key: 'exchangeId',
          label: 'Exchange Identifier',
          type: 'text',
          placeholder: 'exchange-001',
          required: true,
        },
        {
          key: 'consentModel',
          label: 'Consent Model',
          type: 'select',
          options: [
            { label: 'Opt-In', value: 'opt_in' },
            { label: 'Opt-Out', value: 'opt_out' },
            { label: 'Granular', value: 'granular' },
          ],
          required: true,
        },
        {
          key: 'encryptionStandard',
          label: 'Encryption Standard',
          type: 'select',
          options: [
            { label: 'AES-256', value: 'aes_256' },
            { label: 'End-to-End', value: 'e2e' },
            { label: 'Zero-Knowledge', value: 'zk' },
          ],
          required: true,
        },
        {
          key: 'exchangePolicy',
          label: 'Exchange Policy',
          type: 'textarea',
          placeholder: 'Medical record exchange rules and consent parameters',
        },
      ]}
    />
  )
}

