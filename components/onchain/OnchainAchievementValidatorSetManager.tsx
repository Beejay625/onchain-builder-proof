'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementValidatorSetManager(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Validator Set Manager"
      subtitle="Manages validator sets for consensus mechanisms"
      accent="red"
      ctaLabel="Configure Validators"
      payloadPrefix="VALIDATOR_SET_MGR"
      fields={[
        {
          key: 'managerId',
          label: 'Manager Identifier',
          type: 'text',
          placeholder: 'manager-001',
          required: true,
        },
        {
          key: 'consensusType',
          label: 'Consensus Type',
          type: 'select',
          options: [
            { label: 'PoS', value: 'pos' },
            { label: 'PoA', value: 'poa' },
            { label: 'DPoS', value: 'dpos' },
            { label: 'BFT', value: 'bft' },
          ],
          required: true,
        },
        {
          key: 'validatorCount',
          label: 'Validator Count',
          type: 'number',
          placeholder: '21',
          required: true,
        },
        {
          key: 'minStake',
          label: 'Minimum Stake',
          type: 'text',
          placeholder: '1000000',
          required: true,
        },
        {
          key: 'managerPolicy',
          label: 'Manager Policy',
          type: 'textarea',
          placeholder: 'Validator set rules and stake parameters',
        },
      ]}
    />
  )
}

