'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumSafeOracle(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Safe Oracle"
      subtitle="Oracles using post-quantum cryptography"
      accent="orange"
      ctaLabel="Deploy Oracle"
      payloadPrefix="QSAFE_ORACLE"
      fields={[
        {
          key: 'oracleId',
          label: 'Oracle Identifier',
          type: 'text',
          placeholder: 'oracle-001',
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
          key: 'updateVerification',
          label: 'Update Verification',
          type: 'select',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' },
          ],
          required: true,
        },
        {
          key: 'oraclePolicy',
          label: 'Oracle Policy',
          type: 'textarea',
          placeholder: 'Oracle rules and update verification parameters',
        },
      ]}
    />
  )
}

