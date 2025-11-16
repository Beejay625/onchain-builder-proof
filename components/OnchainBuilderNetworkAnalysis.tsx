'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderNetworkAnalysis() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const networkStrength = Math.min(100, (userPosts?.length || 0) * 5)
  const connectionQuality = Math.min(100, (userPosts?.length || 0) * 4)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Network Analysis</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-cyan-600">{networkStrength}%</p>
            <p className="text-sm text-gray-600">Network Strength</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{connectionQuality}%</p>
            <p className="text-sm text-gray-600">Connection Quality</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Analyze your builder network strength and connections.
        </p>
      </div>
    </div>
  )
}

