'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPolygonAvailIntegration(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Polygon Avail Integration"
      subtitle="Integrates Polygon Avail for data availability"
      accent="purple"
      ctaLabel="Configure Integration"
      payloadPrefix="POLYGON_AVAIL"
      fields={[
        {
          key: 'integrationId',
          label: 'Integration Identifier',
          type: 'text',
          placeholder: 'integration-001',
          required: true,
        },
        {
          key: 'availNetwork',
          label: 'Avail Network',
          type: 'select',
          options: [
            { label: 'Mainnet', value: 'mainnet' },
            { label: 'Testnet', value: 'testnet' },
          ],
          required: true,
        },
        {
          key: 'dataSize',
          label: 'Data Size (bytes)',
          type: 'number',
          placeholder: '131072',
          required: true,
        },
        {
          key: 'commitmentType',
          label: 'Commitment Type',
          type: 'select',
          options: [
            { label: 'KZG', value: 'kzg' },
            { label: 'Merkle', value: 'merkle' },
          ],
          required: true,
        },
        {
          key: 'integrationPolicy',
          label: 'Integration Policy',
          type: 'textarea',
          placeholder: 'Polygon Avail integration rules and commitment parameters',
        },
      ]}
    />
  )
}

