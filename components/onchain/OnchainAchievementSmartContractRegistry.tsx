'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSmartContractRegistry(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Smart Contract Registry"
      subtitle="Registry for smart contract verification and management"
      accent="purple"
      ctaLabel="Register Contract"
      payloadPrefix="SMART_CONTRACT_REG"
      fields={[
        {
          key: 'registryId',
          label: 'Registry Identifier',
          type: 'text',
          placeholder: 'registry-001',
          required: true,
        },
        {
          key: 'contractAddress',
          label: 'Contract Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'contractType',
          label: 'Contract Type',
          type: 'select',
          options: [
            { label: 'ERC20', value: 'erc20' },
            { label: 'ERC721', value: 'erc721' },
            { label: 'ERC1155', value: 'erc1155' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'verificationStatus',
          label: 'Verification Status',
          type: 'select',
          options: [
            { label: 'Verified', value: 'verified' },
            { label: 'Pending', value: 'pending' },
            { label: 'Unverified', value: 'unverified' },
          ],
          required: true,
        },
        {
          key: 'registryPolicy',
          label: 'Registry Policy',
          type: 'textarea',
          placeholder: 'Contract registry rules and verification parameters',
        },
      ]}
    />
  )
}

