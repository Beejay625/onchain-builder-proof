'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementInterChainTokenBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Inter-Chain Token Bridge"
      subtitle="Secure token bridging with verification"
      accent="yellow"
      ctaLabel="Deploy Bridge"
      payloadPrefix="INTERCHAIN_TOKEN_BRIDGE"
      fields={[
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
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
          key: 'tokenTypes',
          label: 'Token Types',
          type: 'textarea',
          placeholder: 'ERC20,ERC721,ERC1155',
          required: true,
        },
        {
          key: 'verificationRequired',
          label: 'Verification Required',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Optional', value: 'optional' },
          ],
          required: true,
        },
        {
          key: 'bridgePolicy',
          label: 'Bridge Policy',
          type: 'textarea',
          placeholder: 'Token bridge rules and verification parameters',
        },
      ]}
    />
  )
}

