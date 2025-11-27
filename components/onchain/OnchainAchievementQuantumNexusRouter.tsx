'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementQuantumNexusRouter(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Quantum Nexus Router"
      subtitle="Route operations through quantum-resistant nexus"
      accent="purple"
      ctaLabel="Configure Router"
      payloadPrefix="QNEXUS_ROUTER"
      fields={[
        {
          key: 'routerId',
          label: 'Router Identifier',
          type: 'text',
          placeholder: 'router-001',
          required: true,
        },
        {
          key: 'routingStrategy',
          label: 'Routing Strategy',
          type: 'select',
          options: [
            { label: 'Quantum-First', value: 'quantum_first' },
            { label: 'Hybrid', value: 'hybrid' },
            { label: 'Classic-Fallback', value: 'classic_fallback' },
          ],
          required: true,
        },
        {
          key: 'nexusNodes',
          label: 'Nexus Node Addresses',
          type: 'textarea',
          placeholder: '0x...,0x...,0x...',
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
          ],
          required: true,
        },
        {
          key: 'routingPolicy',
          label: 'Routing Policy',
          type: 'textarea',
          placeholder: 'Routing rules and failover conditions',
        },
      ]}
    />
  )
}

