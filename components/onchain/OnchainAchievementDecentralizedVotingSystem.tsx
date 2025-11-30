'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementDecentralizedVotingSystem(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Decentralized Voting System"
      subtitle="Decentralized voting with multiple voting mechanisms and privacy options"
      accent="teal"
      ctaLabel="Create Vote"
      payloadPrefix="DECENTRALIZED_VOTING"
      fields={[
        {
          key: 'voteId',
          label: 'Vote Identifier',
          type: 'text',
          placeholder: 'vote-001',
          required: true,
        },
        {
          key: 'votingMechanism',
          label: 'Voting Mechanism',
          type: 'select',
          options: [
            { label: 'One-Token-One-Vote', value: 'one_token_one_vote' },
            { label: 'Quadratic', value: 'quadratic' },
            { label: 'Weighted', value: 'weighted' },
            { label: 'Ranked Choice', value: 'ranked_choice' },
          ],
          required: true,
        },
        {
          key: 'privacyLevel',
          label: 'Privacy Level',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
            { label: 'ZK-Proof', value: 'zk_proof' },
          ],
          required: true,
        },
        {
          key: 'votingDuration',
          label: 'Voting Duration (blocks)',
          type: 'number',
          placeholder: '17280',
          required: true,
        },
        {
          key: 'votePolicy',
          label: 'Vote Policy',
          type: 'textarea',
          placeholder: 'Voting system rules and duration parameters',
        },
      ]}
    />
  )
}

