'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementInterChainEscrow(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Inter-Chain Escrow"
      subtitle="Escrow for cross-chain transactions"
      accent="blue"
      ctaLabel="Create Escrow"
      payloadPrefix="INTERCHAIN_ESCROW"
      fields={[
        {
          key: 'escrowId',
          label: 'Escrow Identifier',
          type: 'text',
          placeholder: 'escrow-001',
          required: true,
        },
        {
          key: 'sourceChain',
          label: 'Source Chain',
          type: 'text',
          placeholder: 'ethereum-mainnet',
          required: true,
        },
        {
          key: 'targetChain',
          label: 'Target Chain',
          type: 'text',
          placeholder: 'arbitrum-one',
          required: true,
        },
        {
          key: 'assetType',
          label: 'Asset Type',
          type: 'select',
          options: [
            { label: 'ETH', value: 'eth' },
            { label: 'ERC20', value: 'erc20' },
            { label: 'ERC721', value: 'erc721' },
            { label: 'ERC1155', value: 'erc1155' },
          ],
          required: true,
        },
        {
          key: 'releaseConditions',
          label: 'Release Conditions',
          type: 'textarea',
          placeholder: 'Conditions for escrow release',
          required: true,
        },
        {
          key: 'escrowPolicy',
          label: 'Escrow Policy',
          type: 'textarea',
          placeholder: 'Escrow rules and release parameters',
        },
      ]}
    />
  )
}

