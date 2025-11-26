'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionComplianceGate(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Compliance Gate"
      subtitle="Compliance gate for fusion operations"
      accent="amber"
      ctaLabel="Verify Compliance"
      payloadPrefix="FUSION_COMPLIANCE"
      fields={[
        {
          key: 'gateId',
          label: 'Gate Identifier',
          type: 'text',
          placeholder: 'gate-001',
          required: true,
        },
        {
          key: 'complianceType',
          label: 'Compliance Type',
          type: 'select',
          options: [
            { label: 'KYC', value: 'kyc' },
            { label: 'AML', value: 'aml' },
            { label: 'GDPR', value: 'gdpr' },
            { label: 'Multi-Jurisdiction', value: 'multi_jurisdiction' },
          ],
          required: true,
        },
        {
          key: 'jurisdictions',
          label: 'Jurisdictions',
          type: 'textarea',
          placeholder: 'EU,US,UK',
          required: true,
        },
        {
          key: 'verificationStatus',
          label: 'Verification Status',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Verified', value: 'verified' },
            { label: 'Rejected', value: 'rejected' },
          ],
          required: true,
        },
        {
          key: 'attestationHash',
          label: 'Attestation Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'complianceRules',
          label: 'Compliance Rules',
          type: 'textarea',
          placeholder: 'Compliance rules and validation criteria',
        },
      ]}
    />
  )
}

