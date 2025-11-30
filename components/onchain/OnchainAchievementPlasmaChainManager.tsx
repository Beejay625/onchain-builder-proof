'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPlasmaChainManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Plasma Chain Manager"
      subtitle="Manages Plasma chain operations with exit mechanisms"
      accent="orange"
      ctaLabel="Deploy Manager"
      payloadPrefix="PLASMA_CHAIN_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'plasmaType',
          label: 'Plasma Type',
          type: 'select',
          options: [
            { label: 'Plasma MVP', value: 'mvp' },
            { label: 'Plasma Cash', value: 'cash' },
            { label: 'Plasma Debit', value: 'debit' },
          ],
          required: true,
        },
        {
          key: 'exitPeriod',
          label: 'Exit Period (blocks)',
          type: 'number',
          placeholder: '7',
          required: true,
        },
        {
          key: 'challengePeriod',
          label: 'Challenge Period (blocks)',
          type: 'number',
          placeholder: '1',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Plasma chain rules and exit parameters',
        },
      ]}
    />
  )
}

