'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderExcellenceIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const excellenceIndex = Math.min(100, (userPosts?.length || 0) * 5.5)
  const excellenceLevel = excellenceIndex >= 85 ? 'Excellence' :
                          excellenceIndex >= 65 ? 'High Quality' :
                          excellenceIndex >= 45 ? 'Good Quality' : 'Improving'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⭐ Excellence Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-yellow-600">{excellenceIndex.toFixed(0)}</p>
          <p className="text-gray-600">Excellence Index</p>
          <p className="text-lg font-semibold text-amber-600 mt-2">{excellenceLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure excellence through achievements.
        </p>
      </div>
    </div>
  )
}

