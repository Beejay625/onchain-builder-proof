'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignIdentityBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Identity Bridge"
      subtitle="Bridge sovereign identities across domains"
      accent="lime"
      ctaLabel="Bridge Identity"
      payloadPrefix="SOV_ID_BRIDGE"
      fields={[
        {
          key: 'identityId',
          label: 'Identity Identifier',
          type: 'text',
          placeholder: 'identity-001',
          required: true,
        },
        {
          key: 'sourceDomain',
          label: 'Source Domain',
          type: 'text',
          placeholder: 'domain1',
          required: true,
        },
        {
          key: 'targetDomain',
          label: 'Target Domain',
          type: 'text',
          placeholder: 'domain2',
          required: true,
        },
        {
          key: 'identityType',
          label: 'Identity Type',
          type: 'select',
          options: [
            { label: 'DID', value: 'did' },
            { label: 'ENS', value: 'ens' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'verificationMethod',
          label: 'Verification Method',
          type: 'select',
          options: [
            { label: 'Signature', value: 'signature' },
            { label: 'ZK Proof', value: 'zk_proof' },
            { label: 'Attestation', value: 'attestation' },
          ],
          required: true,
        },
        {
          key: 'bridgeProof',
          label: 'Bridge Proof Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
      ]}
    />
  )
}

