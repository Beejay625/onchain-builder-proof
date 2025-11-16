'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCommunityContribution() {
  const { address } = useAccount()
  const [communityName, setCommunityName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const trackContribution = async () => {
    if (!address || !communityName) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`COMMUNITY: ${communityName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌐 Community Contribution</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Community name"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={trackContribution}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track Contribution'}
        </button>
        {isSuccess && <p className="text-green-600">Contribution tracked onchain!</p>}
      </div>
    </div>
  )
}

