'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPredictiveAnomalyDetector(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Predictive Anomaly Detector"
      subtitle="Detector with predictive anomaly detection"
      accent="red"
      ctaLabel="Deploy Detector"
      payloadPrefix="PREDICTIVE_ANOMALY"
      fields={[
        {
          key: 'detectorId',
          label: 'Detector Identifier',
          type: 'text',
          placeholder: 'detector-001',
          required: true,
        },
        {
          key: 'monitoredSystems',
          label: 'Monitored Systems',
          type: 'textarea',
          placeholder: 'system1,system2,system3',
          required: true,
        },
        {
          key: 'detectionModel',
          label: 'Detection Model',
          type: 'select',
          options: [
            { label: 'ML-Based', value: 'ml_based' },
            { label: 'Statistical', value: 'statistical' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'sensitivityLevel',
          label: 'Sensitivity Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'detectorPolicy',
          label: 'Detector Policy',
          type: 'textarea',
          placeholder: 'Anomaly detection rules and sensitivity parameters',
        },
      ]}
    />
  )
}

