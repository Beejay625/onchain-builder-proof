'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveSecurityGateway(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Security Gateway"
      subtitle="Gateway with adaptive security policies"
      accent="red"
      ctaLabel="Deploy Gateway"
      payloadPrefix="ADAPTIVE_SEC_GW"
      fields={[
        {
          key: 'gatewayId',
          label: 'Gateway Identifier',
          type: 'text',
          placeholder: 'gateway-001',
          required: true,
        },
        {
          key: 'protectedResources',
          label: 'Protected Resources',
          type: 'textarea',
          placeholder: 'resource1,resource2,resource3',
          required: true,
        },
        {
          key: 'securityLevel',
          label: 'Security Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'threatResponse',
          label: 'Threat Response',
          type: 'select',
          options: [
            { label: 'Block', value: 'block' },
            { label: 'Monitor', value: 'monitor' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'gatewayPolicy',
          label: 'Gateway Policy',
          type: 'textarea',
          placeholder: 'Security rules and threat response parameters',
        },
      ]}
    />
  )
}

