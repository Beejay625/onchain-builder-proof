'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeFinalityGuarantor(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Finality Guarantor"
      subtitle="Guarantees finality for bridge operations"
      accent="violet"
      ctaLabel="Deploy Guarantor"
      payloadPrefix="BRIDGE_FINALITY_GUARANTOR"
      fields={[
        {
          key: 'guarantorId',
          label: 'Guarantor Identifier',
          type: 'text',
          placeholder: 'guarantor-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'finalityType',
          label: 'Finality Type',
          type: 'select',
          options: [
            { label: 'Immediate', value: 'immediate' },
            { label: 'Probabilistic', value: 'probabilistic' },
            { label: 'Absolute', value: 'absolute' },
          ],
          required: true,
        },
        {
          key: 'guaranteeLevel',
          label: 'Guarantee Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'guarantorPolicy',
          label: 'Guarantor Policy',
          type: 'textarea',
          placeholder: 'Finality guarantor rules and guarantee parameters',
        },
      ]}
    />
  )
}

