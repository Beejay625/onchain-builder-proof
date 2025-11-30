'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSidechainConnector(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sidechain Connector"
      subtitle="Connects mainchain with sidechains for asset transfers"
      accent="teal"
      ctaLabel="Deploy Connector"
      payloadPrefix="SIDECHAIN_CONNECTOR"
      fields={[
        {
          key: 'connectorId',
          label: 'Connector Identifier',
          type: 'text',
          placeholder: 'connector-001',
          required: true,
        },
        {
          key: 'mainchain',
          label: 'Mainchain',
          type: 'text',
          placeholder: 'ethereum-mainnet',
          required: true,
        },
        {
          key: 'sidechain',
          label: 'Sidechain',
          type: 'text',
          placeholder: 'polygon',
          required: true,
        },
        {
          key: 'transferMode',
          label: 'Transfer Mode',
          type: 'select',
          options: [
            { label: 'Lock-and-Mint', value: 'lock_mint' },
            { label: 'Burn-and-Mint', value: 'burn_mint' },
            { label: 'Two-Way Peg', value: 'two_way_peg' },
          ],
          required: true,
        },
        {
          key: 'connectorPolicy',
          label: 'Connector Policy',
          type: 'textarea',
          placeholder: 'Sidechain connector rules and transfer parameters',
        },
      ]}
    />
  )
}

