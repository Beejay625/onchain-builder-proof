'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementMeshTreasuryPool(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Mesh Treasury Pool"
      subtitle="Treasury pool for mesh network operations"
      accent="yellow"
      ctaLabel="Create Pool"
      payloadPrefix="MESH_TREASURY"
      fields={[
        {
          key: 'poolId',
          label: 'Pool Identifier',
          type: 'text',
          placeholder: 'pool-001',
          required: true,
        },
        {
          key: 'meshId',
          label: 'Mesh Network ID',
          type: 'text',
          placeholder: 'mesh-001',
          required: true,
        },
        {
          key: 'assetTypes',
          label: 'Asset Types',
          type: 'textarea',
          placeholder: 'ETH,USDC,DAI',
          required: true,
        },
        {
          key: 'poolType',
          label: 'Pool Type',
          type: 'select',
          options: [
            { label: 'Shared', value: 'shared' },
            { label: 'Segregated', value: 'segregated' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          key: 'allocationPolicy',
          label: 'Allocation Policy',
          type: 'textarea',
          placeholder: 'Treasury allocation rules and limits',
        },
      ]}
    />
  )
}

