'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementTokenStandardCompliance(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Token Standard Compliance"
      subtitle="Ensures token compliance with ERC standards"
      accent="green"
      ctaLabel="Verify Compliance"
      payloadPrefix="TOKEN_STD_COMPLIANCE"
      fields={[
        {
          key: 'complianceId',
          label: 'Compliance Identifier',
          type: 'text',
          placeholder: 'compliance-001',
          required: true,
        },
        {
          key: 'tokenAddress',
          label: 'Token Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'standardType',
          label: 'Standard Type',
          type: 'select',
          options: [
            { label: 'ERC20', value: 'erc20' },
            { label: 'ERC721', value: 'erc721' },
            { label: 'ERC1155', value: 'erc1155' },
            { label: 'ERC777', value: 'erc777' },
          ],
          required: true,
        },
        {
          key: 'complianceLevel',
          label: 'Compliance Level',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Partial', value: 'partial' },
            { label: 'Minimal', value: 'minimal' },
          ],
          required: true,
        },
        {
          key: 'compliancePolicy',
          label: 'Compliance Policy',
          type: 'textarea',
          placeholder: 'Token compliance rules and standard parameters',
        },
      ]}
    />
  )
}

