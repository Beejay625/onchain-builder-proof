'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderConvergenceIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const convergenceIndex = Math.min(100, (userPosts?.length || 0) * 4.1)
  const convergenceLevel = convergenceIndex >= 75 ? 'Converged' :
                          convergenceIndex >= 55 ? 'Converging' :
                          convergenceIndex >= 35 ? 'Aligning' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Convergence Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-teal-600">{convergenceIndex.toFixed(0)}</p>
          <p className="text-gray-600">Convergence Index</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{convergenceLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure convergence of achievements.
        </p>
      </div>
    </div>
  )
}

