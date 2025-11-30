'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMultiSignatureEscrow(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Multi-Signature Escrow"
      subtitle="Escrow requiring multiple signatures for release"
      accent="rose"
      ctaLabel="Create Escrow"
      payloadPrefix="MULTISIG_ESCROW"
      fields={[
        {
          key: 'escrowId',
          label: 'Escrow Identifier',
          type: 'text',
          placeholder: 'escrow-001',
          required: true,
        },
        {
          key: 'signerAddresses',
          label: 'Signer Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
          required: true,
        },
        {
          key: 'signatureThreshold',
          label: 'Signature Threshold',
          type: 'number',
          placeholder: '2',
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
          ],
          required: true,
        },
        {
          key: 'escrowPolicy',
          label: 'Escrow Policy',
          type: 'textarea',
          placeholder: 'Multi-sig escrow rules and threshold parameters',
        },
      ]}
    />
  )
}

