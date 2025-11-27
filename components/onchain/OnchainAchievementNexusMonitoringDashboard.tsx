'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementNexusMonitoringDashboard(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Nexus Monitoring Dashboard"
      subtitle="Monitoring dashboard for nexus network operations"
      accent="sky"
      ctaLabel="Deploy Dashboard"
      payloadPrefix="NEXUS_MONITORING"
      fields={[
        {
          key: 'dashboardId',
          label: 'Dashboard Identifier',
          type: 'text',
          placeholder: 'dashboard-001',
          required: true,
        },
        {
          key: 'nexusId',
          label: 'Nexus Network ID',
          type: 'text',
          placeholder: 'nexus-001',
          required: true,
        },
        {
          key: 'monitoringMetrics',
          label: 'Monitoring Metrics',
          type: 'textarea',
          placeholder: 'latency,throughput,error_rate,sovereignty_health',
          required: true,
        },
        {
          key: 'refreshInterval',
          label: 'Refresh Interval (seconds)',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'alertThresholds',
          label: 'Alert Thresholds',
          type: 'textarea',
          placeholder: 'Threshold values and alert rules',
        },
      ]}
    />
  )
}

