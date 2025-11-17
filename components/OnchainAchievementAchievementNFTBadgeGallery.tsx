'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementNFTBadgeGallery() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const badges = Math.floor((userPosts?.length || 0) / 5)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🖼️ NFT Badge Gallery</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-purple-600">{badges}</p>
        <p className="text-gray-600">NFT badges</p>
        <p className="text-sm text-gray-500 mt-2">
          View your badge collection
        </p>
      </div>
    </div>
  )
}

