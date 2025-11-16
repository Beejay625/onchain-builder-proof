'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderRefinementIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const refinementIndex = Math.min(100, (userPosts?.length || 0) * 4.2)
  const refinementLevel = refinementIndex >= 80 ? 'Refined' :
                          refinementIndex >= 60 ? 'Polished' :
                          refinementIndex >= 40 ? 'Improving' : 'Developing'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✨ Refinement Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">{refinementIndex.toFixed(0)}</p>
          <p className="text-gray-600">Refinement Index</p>
          <p className="text-lg font-semibold text-pink-600 mt-2">{refinementLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure refinement through achievements.
        </p>
      </div>
    </div>
  )
}

