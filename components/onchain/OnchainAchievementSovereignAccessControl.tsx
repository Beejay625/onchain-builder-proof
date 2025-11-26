'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignAccessControl(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Access Control"
      subtitle="Access control for sovereign operations"
      accent="slate"
      ctaLabel="Configure Access"
      payloadPrefix="SOV_ACCESS"
      fields={[
        {
          key: 'policyId',
          label: 'Policy Identifier',
          type: 'text',
          placeholder: 'policy-001',
          required: true,
        },
        {
          key: 'resourceType',
          label: 'Resource Type',
          type: 'select',
          options: [
            { label: 'Achievement', value: 'achievement' },
            { label: 'Treasury', value: 'treasury' },
            { label: 'Governance', value: 'governance' },
            { label: 'Data', value: 'data' },
          ],
          required: true,
        },
        {
          key: 'accessLevel',
          label: 'Access Level',
          type: 'select',
          options: [
            { label: 'Read', value: 'read' },
            { label: 'Write', value: 'write' },
            { label: 'Execute', value: 'execute' },
            { label: 'Admin', value: 'admin' },
          ],
          required: true,
        },
        {
          key: 'authorizedEntities',
          label: 'Authorized Entities',
          type: 'textarea',
          placeholder: 'address1,address2,address3',
          required: true,
        },
        {
          key: 'enforcementMode',
          label: 'Enforcement Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Advisory', value: 'advisory' },
          ],
          required: true,
        },
        {
          key: 'policyRules',
          label: 'Policy Rules',
          type: 'textarea',
          placeholder: 'Access control rules and conditions',
        },
      ]}
    />
  )
}

