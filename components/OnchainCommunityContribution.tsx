'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainCommunityContributionProps {
  achievementId: bigint
}

export default function OnchainCommunityContribution({ achievementId }: OnchainCommunityContributionProps) {
  const { address } = useAccount()
  const [communityName, setCommunityName] = useState('')
  const [contributionType, setContributionType] = useState('event')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const trackContribution = async () => {
    if (!address || !communityName.trim()) return
    
    const contributionData = `COMMUNITY_CONTRIBUTION: ${communityName} - Type: ${contributionType}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, contributionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌐 Onchain Community Contribution</h3>
      
      <input
        type="text"
        value={communityName}
        onChange={(e) => setCommunityName(e.target.value)}
        placeholder="Community name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={contributionType}
        onChange={(e) => setContributionType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="event">Event</option>
        <option value="mentorship">Mentorship</option>
        <option value="content">Content</option>
        <option value="moderation">Moderation</option>
        <option value="other">Other</option>
      </select>
      
      <button
        onClick={trackContribution}
        disabled={isPending || isConfirming || !communityName.trim()}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Tracking...' : 'Track Contribution'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Community contribution tracked onchain
        </div>
      )}
    </div>
  )
}
