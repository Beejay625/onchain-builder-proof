'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementLayer2RollupManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Layer 2 Rollup Manager"
      subtitle="Manages Layer 2 rollup operations with optimistic or zk-rollup support"
      accent="indigo"
      ctaLabel="Deploy Rollup"
      payloadPrefix="L2_ROLLUP_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'rollupType',
          label: 'Rollup Type',
          type: 'select',
          options: [
            { label: 'Optimistic', value: 'optimistic' },
            { label: 'ZK-Rollup', value: 'zk_rollup' },
            { label: 'Validium', value: 'validium' },
          ],
          required: true,
        },
        {
          key: 'batchInterval',
          label: 'Batch Interval (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'challengePeriod',
          label: 'Challenge Period (blocks)',
          type: 'number',
          placeholder: '7',
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Rollup manager rules and batch parameters',
        },
      ]}
    />
  )
}

