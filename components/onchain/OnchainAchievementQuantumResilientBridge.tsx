'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumResilientBridge(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum-Resilient Bridge"
      subtitle="Bridge with quantum-resistant security guarantees"
      accent="indigo"
      ctaLabel="Deploy Bridge"
      payloadPrefix="QBRIDGE"
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
          placeholder: 'ethereum',
          required: true,
        },
        {
          key: 'targetChain',
          label: 'Target Chain',
          type: 'text',
          placeholder: 'arbitrum',
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
          key: 'bridgeMode',
          label: 'Bridge Mode',
          type: 'select',
          options: [
            { label: 'Lock-and-Mint', value: 'lock_mint' },
            { label: 'Burn-and-Mint', value: 'burn_mint' },
            { label: 'Atomic Swap', value: 'atomic_swap' },
          ],
          required: true,
        },
        {
          key: 'securityPolicy',
          label: 'Security Policy',
          type: 'textarea',
          placeholder: 'Bridge security rules and validation criteria',
        },
      ]}
    />
  )
}

