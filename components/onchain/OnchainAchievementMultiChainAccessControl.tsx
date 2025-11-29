'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiChainAccessControl(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Chain Access Control"
      subtitle="Access control across multiple chains"
      accent="slate"
      ctaLabel="Configure Access"
      payloadPrefix="MULTICHAIN_ACCESS"
      fields={[
        {
          key: 'policyId',
          label: 'Policy Identifier',
          type: 'text',
          placeholder: 'policy-001',
          required: true,
        },
        {
          key: 'targetChains',
          label: 'Target Chains',
          type: 'textarea',
          placeholder: 'ethereum-mainnet,arbitrum-one,optimism',
          required: true,
        },
        {
          key: 'resourceType',
          label: 'Resource Type',
          type: 'select',
          options: [
            { label: 'Bridge', value: 'bridge' },
            { label: 'Treasury', value: 'treasury' },
            { label: 'Governance', value: 'governance' },
            { label: 'Node', value: 'node' },
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
          key: 'policyRules',
          label: 'Policy Rules',
          type: 'textarea',
          placeholder: 'Access control rules and entity parameters',
        },
      ]}
    />
  )
}

