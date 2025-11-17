'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementVerificationBadge() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const isVerified = (userPosts?.length || 0) >= 10

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✓ Verification Badge</h2>
      <div className="text-center">
        {isVerified ? (
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <p className="text-lg font-semibold">✓ Verified Builder</p>
          </div>
        ) : (
          <div className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full">
            <p className="text-lg font-semibold">Not Verified</p>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Based on onchain activity
        </p>
      </div>
    </div>
  )
}

