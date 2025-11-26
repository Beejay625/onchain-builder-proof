'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementEvidenceCourierSpoke(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Evidence Courier Spoke"
      subtitle="Route forensic bundles safely"
      accent="yellow"
      ctaLabel="Relay Evidence Bundle"
      payloadPrefix="COURIER_SPOKE"
      fields={[
        {
          key: 'spokeLabel',
          label: 'Spoke Label',
          type: 'text',
          placeholder: 'evidence-eu1',
          required: true,
        },
        {
          key: 'cid',
          label: 'Evidence CID',
          type: 'text',
          placeholder: 'bafy...',
          required: true,
        },
        {
          key: 'courier',
          label: 'Courier',
          type: 'text',
          placeholder: 'guardian-audit',
          required: true,
        },
        {
          key: 'encryption',
          label: 'Encryption Details',
          type: 'textarea',
          placeholder: 'AES256, shared secret',
          required: true,
        },
      ]}
    />
  )
}
