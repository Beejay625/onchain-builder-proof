'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentServiceMesh(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Service Mesh"
      subtitle="Service mesh with intelligent routing"
      accent="indigo"
      ctaLabel="Deploy Mesh"
      payloadPrefix="INTELLIGENT_SERVICE_MESH"
      fields={[
        {
          key: 'meshId',
          label: 'Mesh Identifier',
          type: 'text',
          placeholder: 'mesh-001',
          required: true,
        },
        {
          key: 'serviceInstances',
          label: 'Service Instances',
          type: 'textarea',
          placeholder: 'service1,service2,service3',
          required: true,
        },
        {
          key: 'routingPolicy',
          label: 'Routing Policy',
          type: 'select',
          options: [
            { label: 'Round-Robin', value: 'round_robin' },
            { label: 'Least-Load', value: 'least_load' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'trafficManagement',
          label: 'Traffic Management',
          type: 'select',
          options: [
            { label: 'Circuit-Breaker', value: 'circuit_breaker' },
            { label: 'Retry', value: 'retry' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'meshPolicy',
          label: 'Mesh Policy',
          type: 'textarea',
          placeholder: 'Service mesh rules and routing parameters',
        },
      ]}
    />
  )
}

