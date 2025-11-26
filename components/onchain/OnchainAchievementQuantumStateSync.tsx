'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumStateSync(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum State Sync"
      subtitle="Sync quantum-resistant state across chains"
      accent="indigo"
      ctaLabel="Sync Quantum State"
      payloadPrefix="QUANTUM_SYNC"
      fields={[
        {
          key: 'sourceChain',
          label: 'Source Chain',
          type: 'text',
          placeholder: 'ethereum',
          required: true,
        },
        {
          key: 'targetChains',
          label: 'Target Chains',
          type: 'textarea',
          placeholder: 'polygon,avalanche,cosmos',
          required: true,
        },
        {
          key: 'quantumAlgorithm',
          label: 'Quantum Algorithm',
          type: 'select',
          options: [
            { label: 'CRYSTALS-Kyber', value: 'kyber' },
            { label: 'CRYSTALS-Dilithium', value: 'dilithium' },
            { label: 'FALCON', value: 'falcon' },
            { label: 'SPHINCS+', value: 'sphincs' },
          ],
          required: true,
        },
        {
          key: 'stateHash',
          label: 'State Root Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'syncProof',
          label: 'Sync Proof CID',
          type: 'text',
          placeholder: 'Qm...',
        },
      ]}
    />
  )
}

