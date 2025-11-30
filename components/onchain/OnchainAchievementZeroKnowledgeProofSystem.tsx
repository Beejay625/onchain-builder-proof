'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementZeroKnowledgeProofSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Zero-Knowledge Proof System"
      subtitle="Generates and verifies zero-knowledge proofs for privacy-preserving operations"
      accent="purple"
      ctaLabel="Deploy System"
      payloadPrefix="ZK_PROOF_SYSTEM"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'proofType',
          label: 'Proof Type',
          type: 'select',
          options: [
            { label: 'ZK-SNARK', value: 'zk_snark' },
            { label: 'ZK-STARK', value: 'zk_stark' },
            { label: 'Bulletproofs', value: 'bulletproofs' },
            { label: 'PLONK', value: 'plonk' },
          ],
          required: true,
        },
        {
          key: 'circuitType',
          label: 'Circuit Type',
          type: 'select',
          options: [
            { label: 'Arithmetic', value: 'arithmetic' },
            { label: 'Boolean', value: 'boolean' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'trustedSetup',
          label: 'Trusted Setup Required',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'ZK proof system rules and circuit parameters',
        },
      ]}
    />
  )
}

