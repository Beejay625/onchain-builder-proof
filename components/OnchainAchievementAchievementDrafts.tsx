'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementDrafts() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const drafts = 3

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Achievement Drafts</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-600">{drafts}</p>
        <p className="text-gray-600">Saved drafts</p>
        <p className="text-sm text-gray-500 mt-2">
          Work in progress
        </p>
      </div>
    </div>
  )
}

