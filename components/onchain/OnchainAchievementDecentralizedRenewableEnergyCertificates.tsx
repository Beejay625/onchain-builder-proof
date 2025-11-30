'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedRenewableEnergyCertificates(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Renewable Energy Certificates"
      subtitle="Trading platform for renewable energy certificates with verification"
      accent="emerald"
      ctaLabel="Deploy Platform"
      payloadPrefix="DECENTRALIZED_REC"
      fields={[
        {
          key: 'platformId',
          label: 'Platform Identifier',
          type: 'text',
          placeholder: 'platform-001',
          required: true,
        },
        {
          key: 'energySource',
          label: 'Energy Source',
          type: 'select',
          options: [
            { label: 'Solar', value: 'solar' },
            { label: 'Wind', value: 'wind' },
            { label: 'Hydro', value: 'hydro' },
            { label: 'Geothermal', value: 'geothermal' },
          ],
          required: true,
        },
        {
          key: 'certificateStandard',
          label: 'Certificate Standard',
          type: 'select',
          options: [
            { label: 'I-REC', value: 'i_rec' },
            { label: 'APX', value: 'apx' },
            { label: 'Green-e', value: 'green_e' },
          ],
          required: true,
        },
        {
          key: 'platformPolicy',
          label: 'Platform Policy',
          type: 'textarea',
          placeholder: 'REC platform rules and certificate parameters',
        },
      ]}
    />
  )
}

