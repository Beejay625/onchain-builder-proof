'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementCrossChainBridgeSecurity(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Cross-Chain Bridge Security"
      subtitle="Secures bridge operations with multi-signature verification"
      accent="blue"
      ctaLabel="Deploy Security"
      payloadPrefix="XCHAIN_BRIDGE_SEC"
      fields={[
        {
          key: 'securityId',
          label: 'Security Identifier',
          type: 'text',
          placeholder: 'security-001',
          required: true,
        },
        {
          key: 'bridgeId',
          label: 'Bridge Identifier',
          type: 'text',
          placeholder: 'bridge-001',
          required: true,
        },
        {
          key: 'multisigThreshold',
          label: 'Multi-Sig Threshold',
          type: 'number',
          placeholder: '3',
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
          key: 'verificationMode',
          label: 'Verification Mode',
          type: 'select',
          options: [
            { label: 'Strict', value: 'strict' },
            { label: 'Standard', value: 'standard' },
            { label: 'Flexible', value: 'flexible' },
          ],
          required: true,
        },
        {
          key: 'securityPolicy',
          label: 'Security Policy',
          type: 'textarea',
          placeholder: 'Bridge security rules and verification parameters',
        },
      ]}
    />
  )
}

