'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentAutomationMesh(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Automation Mesh"
      subtitle="Mesh for intelligent automation across domains"
      accent="indigo"
      ctaLabel="Deploy Mesh"
      payloadPrefix="INTELLIGENT_AUTO_MESH"
      fields={[
        {
          key: 'meshId',
          label: 'Mesh Identifier',
          type: 'text',
          placeholder: 'mesh-001',
          required: true,
        },
        {
          key: 'automationDomains',
          label: 'Automation Domains',
          type: 'textarea',
          placeholder: 'domain1,domain2,domain3',
          required: true,
        },
        {
          key: 'intelligenceLevel',
          label: 'Intelligence Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'learningMode',
          label: 'Learning Mode',
          type: 'select',
          options: [
            { label: 'Supervised', value: 'supervised' },
            { label: 'Unsupervised', value: 'unsupervised' },
            { label: 'Reinforcement', value: 'reinforcement' },
          ],
          required: true,
        },
        {
          key: 'meshPolicy',
          label: 'Mesh Policy',
          type: 'textarea',
          placeholder: 'Automation rules and intelligence parameters',
        },
      ]}
    />
  )
}

