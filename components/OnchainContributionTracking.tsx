'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainContributionTrackingProps {
  achievementId: bigint
}

export default function OnchainContributionTracking({ achievementId }: OnchainContributionTrackingProps) {
  const { address } = useAccount()
  const [contributionType, setContributionType] = useState('code')
  const [contributionDescription, setContributionDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const trackContribution = async () => {
    if (!address || !contributionDescription.trim()) return
    
    const contributionData = `CONTRIBUTION_TRACKING: ${contributionType} - ${contributionDescription}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, contributionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Onchain Contribution Tracking</h3>
      
      <select
        value={contributionType}
        onChange={(e) => setContributionType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="code">Code</option>
        <option value="design">Design</option>
        <option value="documentation">Documentation</option>
        <option value="testing">Testing</option>
        <option value="review">Code Review</option>
        <option value="other">Other</option>
      </select>
      
      <textarea
        value={contributionDescription}
        onChange={(e) => setContributionDescription(e.target.value)}
        placeholder="Describe your contribution..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      
      <button
        onClick={trackContribution}
        disabled={isPending || isConfirming || !contributionDescription.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Tracking...' : 'Track Contribution'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Contribution tracked onchain
        </div>
      )}
    </div>
  )
}
