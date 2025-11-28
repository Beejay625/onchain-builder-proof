'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAdaptiveBackupSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Adaptive Backup System"
      subtitle="Backup system with adaptive scheduling"
      accent="blue"
      ctaLabel="Deploy System"
      payloadPrefix="ADAPTIVE_BACKUP"
      fields={[
        {
          key: 'systemId',
          label: 'System Identifier',
          type: 'text',
          placeholder: 'system-001',
          required: true,
        },
        {
          key: 'backupTargets',
          label: 'Backup Targets',
          type: 'textarea',
          placeholder: 'target1,target2,target3',
          required: true,
        },
        {
          key: 'backupStrategy',
          label: 'Backup Strategy',
          type: 'select',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Incremental', value: 'incremental' },
            { label: 'Adaptive', value: 'adaptive' },
          ],
          required: true,
        },
        {
          key: 'retentionPolicy',
          label: 'Retention Policy',
          type: 'select',
          options: [
            { label: 'Short-term', value: 'short' },
            { label: 'Medium-term', value: 'medium' },
            { label: 'Long-term', value: 'long' },
          ],
          required: true,
        },
        {
          key: 'systemPolicy',
          label: 'System Policy',
          type: 'textarea',
          placeholder: 'Backup rules and retention parameters',
        },
      ]}
    />
  )
}

