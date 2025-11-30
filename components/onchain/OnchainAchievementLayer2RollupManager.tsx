'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementLayer2RollupManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Layer 2 Rollup Manager"
      subtitle="Manages Layer 2 rollup operations with batch submissions"
      accent="indigo"
      ctaLabel="Deploy Manager"
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
          key: 'sequencerAddress',
          label: 'Sequencer Address',
          type: 'text',
          placeholder: '0x...',
          required: true,
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
