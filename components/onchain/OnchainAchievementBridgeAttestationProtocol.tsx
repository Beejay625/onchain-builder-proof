'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementBridgeAttestationProtocol(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Bridge Attestation Protocol"
      subtitle="Attests bridge operations with cryptographic proofs"
      accent="violet"
      ctaLabel="Deploy Protocol"
      payloadPrefix="BRIDGE_ATTEST_PROTOCOL"
      fields={[
        {
          key: 'protocolId',
          label: 'Protocol Identifier',
          type: 'text',
          placeholder: 'protocol-001',
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
          key: 'attestationType',
          label: 'Attestation Type',
          type: 'select',
          options: [
            { label: 'Transaction', value: 'transaction' },
            { label: 'State', value: 'state' },
            { label: 'Proof', value: 'proof' },
            { label: 'Compliance', value: 'compliance' },
          ],
          required: true,
        },
        {
          key: 'proofAlgorithm',
          label: 'Proof Algorithm',
          type: 'select',
          options: [
            { label: 'Merkle', value: 'merkle' },
            { label: 'ZK-SNARK', value: 'zk_snark' },
            { label: 'ZK-STARK', value: 'zk_stark' },
          ],
          required: true,
        },
        {
          key: 'protocolPolicy',
          label: 'Protocol Policy',
          type: 'textarea',
          placeholder: 'Attestation protocol rules and proof parameters',
        },
      ]}
    />
  )
}

