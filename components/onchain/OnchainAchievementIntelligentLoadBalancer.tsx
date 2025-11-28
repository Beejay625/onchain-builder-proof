'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentLoadBalancer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Load Balancer"
      subtitle="Load balancer with intelligent distribution"
      accent="orange"
      ctaLabel="Deploy Balancer"
      payloadPrefix="INTELLIGENT_LB"
      fields={[
        {
          key: 'balancerId',
          label: 'Balancer Identifier',
          type: 'text',
          placeholder: 'balancer-001',
          required: true,
        },
        {
          key: 'targetServices',
          label: 'Target Services',
          type: 'textarea',
          placeholder: 'service1,service2,service3',
          required: true,
        },
        {
          key: 'balancingAlgorithm',
          label: 'Balancing Algorithm',
          type: 'select',
          options: [
            { label: 'Round-Robin', value: 'round_robin' },
            { label: 'Least-Connections', value: 'least_connections' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'healthCheckInterval',
          label: 'Health Check Interval (seconds)',
          type: 'number',
          placeholder: '30',
          required: true,
        },
        {
          key: 'balancerPolicy',
          label: 'Balancer Policy',
          type: 'textarea',
          placeholder: 'Load balancing rules and health check parameters',
        },
      ]}
    />
  )
}

