'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSafeMultiSig(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Safe Multi-Sig"
      subtitle="Multi-signature with post-quantum schemes"
      accent="teal"
      ctaLabel="Create Multi-Sig"
      payloadPrefix="QSAFE_MULTISIG"
      fields={[
        {
          key: 'multisigId',
          label: 'Multi-Sig Identifier',
          type: 'text',
          placeholder: 'multisig-001',
          required: true,
        },
        {
          key: 'signatureScheme',
          label: 'Signature Scheme',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'signerSet',
          label: 'Signer Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
          required: true,
        },
        {
          key: 'threshold',
          label: 'Threshold',
          type: 'number',
          placeholder: '3',
          required: true,
        },
        {
          key: 'multisigPolicy',
          label: 'Multi-Sig Policy',
          type: 'textarea',
          placeholder: 'Multi-signature rules and threshold parameters',
        },
      ]}
    />
  )
}

