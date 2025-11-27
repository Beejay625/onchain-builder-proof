'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusAuditTrail(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Audit Trail"
      subtitle="Audit trail for nexus network operations"
      accent="slate"
      ctaLabel="Create Trail"
      payloadPrefix="NEXUS_AUDIT_TRAIL"
      fields={[
        {
          key: 'trailId',
          label: 'Trail Identifier',
          type: 'text',
          placeholder: 'trail-001',
          required: true,
        },
        {
          key: 'nexusId',
          label: 'Nexus Network ID',
          type: 'text',
          placeholder: 'nexus-001',
          required: true,
        },
        {
          key: 'auditScope',
          label: 'Audit Scope',
          type: 'textarea',
          placeholder: 'Operations,governance,treasury,access',
          required: true,
        },
        {
          key: 'retentionPolicy',
          label: 'Retention Policy',
          type: 'select',
          options: [
            { label: 'Short-term', value: 'short' },
            { label: 'Medium-term', value: 'medium' },
            { label: 'Long-term', value: 'long' },
            { label: 'Permanent', value: 'permanent' },
          ],
          required: true,
        },
        {
          key: 'immutabilityLevel',
          label: 'Immutability Level',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Partial', value: 'partial' },
            { label: 'Append-Only', value: 'append_only' },
          ],
          required: true,
        },
      ]}
    />
  )
}

