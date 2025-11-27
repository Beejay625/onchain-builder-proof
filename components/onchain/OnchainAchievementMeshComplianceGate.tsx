'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshComplianceGate(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Compliance Gate"
      subtitle="Compliance gate for mesh network operations"
      accent="amber"
      ctaLabel="Configure Gate"
      payloadPrefix="MESH_COMPLIANCE"
      fields={[
        {
          key: 'gateId',
          label: 'Gate Identifier',
          type: 'text',
          placeholder: 'gate-001',
          required: true,
        },
        {
          key: 'meshId',
          label: 'Mesh Network ID',
          type: 'text',
          placeholder: 'mesh-001',
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
        },
      ]}
    />
  )
}

