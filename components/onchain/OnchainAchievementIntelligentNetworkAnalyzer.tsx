'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIntelligentNetworkAnalyzer(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Intelligent Network Analyzer"
      subtitle="Analyzer for intelligent network analysis"
      accent="blue"
      ctaLabel="Deploy Analyzer"
      payloadPrefix="INTELLIGENT_NET_ANALYZER"
      fields={[
        {
          key: 'analyzerId',
          label: 'Analyzer Identifier',
          type: 'text',
          placeholder: 'analyzer-001',
          required: true,
        },
        {
          key: 'analyzedNetworks',
          label: 'Analyzed Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
          required: true,
        },
        {
          key: 'analysisType',
          label: 'Analysis Type',
          type: 'select',
          options: [
            { label: 'Traffic', value: 'traffic' },
            { label: 'Performance', value: 'performance' },
            { label: 'Security', value: 'security' },
            { label: 'Comprehensive', value: 'comprehensive' },
          ],
          required: true,
        },
        {
          key: 'analysisDepth',
          label: 'Analysis Depth',
          type: 'select',
          options: [
            { label: 'Surface', value: 'surface' },
            { label: 'Deep', value: 'deep' },
            { label: 'Intelligent', value: 'intelligent' },
          ],
          required: true,
        },
        {
          key: 'analyzerPolicy',
          label: 'Analyzer Policy',
          type: 'textarea',
          placeholder: 'Network analysis rules and depth parameters',
        },
      ]}
    />
  )
}

