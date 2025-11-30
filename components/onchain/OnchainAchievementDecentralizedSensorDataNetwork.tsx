'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedSensorDataNetwork(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Sensor Data Network"
      subtitle="Network for collecting and monetizing IoT sensor data"
      accent="teal"
      ctaLabel="Deploy Network"
      payloadPrefix="DECENTRALIZED_SENSOR_NET"
      fields={[
        {
          key: 'networkId',
          label: 'Network Identifier',
          type: 'text',
          placeholder: 'network-001',
          required: true,
        },
        {
          key: 'sensorType',
          label: 'Sensor Type',
          type: 'select',
          options: [
            { label: 'Temperature', value: 'temperature' },
            { label: 'Humidity', value: 'humidity' },
            { label: 'Motion', value: 'motion' },
            { label: 'Mixed', value: 'mixed' },
          ],
          required: true,
        },
        {
          key: 'dataFrequency',
          label: 'Data Frequency (seconds)',
          type: 'number',
          placeholder: '60',
          required: true,
        },
        {
          key: 'networkPolicy',
          label: 'Network Policy',
          type: 'textarea',
          placeholder: 'Sensor data network rules and frequency parameters',
        },
      ]}
    />
  )
}

