'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarAuditTrail(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Audit Trail"
      subtitle="Audit trail for stellar network operations"
      accent="slate"
      ctaLabel="Create Trail"
      payloadPrefix="STELLAR_AUDIT_TRAIL"
      fields={[
        {
          key: 'trailId',
          label: 'Trail Identifier',
          type: 'text',
          placeholder: 'trail-001',
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
          key: 'trailPolicy',
          label: 'Trail Policy',
          type: 'textarea',
          placeholder: 'Audit trail rules and retention parameters',
        },
      ]}
    />
  )
}

