'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainIdentityBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Identity Bridge"
      subtitle="Bridges identities across chains with verification"
      accent="green"
      ctaLabel="Deploy Bridge"
      payloadPrefix="XCHAIN_ID_BRIDGE"
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
          key: 'identityStandard',
          label: 'Identity Standard',
          type: 'select',
          options: [
            { label: 'DID', value: 'did' },
            { label: 'Verifiable Credentials', value: 'vc' },
            { label: 'ENS', value: 'ens' },
            { label: 'Custom', value: 'custom' },
          ],
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
          placeholder: 'Identity bridge rules and verification parameters',
        },
      ]}
    />
  )
}

