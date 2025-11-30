'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedSupplyChainManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Supply Chain Manager"
      subtitle="Tracks products through supply chain with verifiable provenance"
      accent="amber"
      ctaLabel="Deploy Manager"
      payloadPrefix="DECENTRALIZED_SUPPLY_CHAIN"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'trackingMethod',
          label: 'Tracking Method',
          type: 'select',
          options: [
            { label: 'RFID', value: 'rfid' },
            { label: 'QR Code', value: 'qr_code' },
            { label: 'NFC', value: 'nfc' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'verificationLevel',
          label: 'Verification Level',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Partial', value: 'partial' },
            { label: 'Basic', value: 'basic' },
          ],
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Supply chain manager rules and tracking parameters',
        },
      ]}
    />
  )
}

