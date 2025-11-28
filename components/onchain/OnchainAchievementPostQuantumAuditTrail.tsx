'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostQuantumAuditTrail(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Quantum Audit Trail"
      subtitle="Audit trails using post-quantum hashing"
      accent="slate"
      ctaLabel="Create Trail"
      payloadPrefix="PQ_AUDIT_TRAIL"
      fields={[
        {
          key: 'trailId',
          label: 'Trail Identifier',
          type: 'text',
          placeholder: 'trail-001',
          required: true,
        },
        {
          key: 'eventMetadata',
          label: 'Event Metadata',
          type: 'textarea',
          placeholder: 'Event types and metadata structure',
          required: true,
        },
        {
          key: 'tamperDetection',
          label: 'Tamper Detection',
          type: 'select',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' },
          ],
          required: true,
        },
        {
          key: 'trailPolicy',
          label: 'Trail Policy',
          type: 'textarea',
          placeholder: 'Audit trail rules and tamper detection parameters',
        },
      ]}
    />
  )
}

