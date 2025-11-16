'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderNetworkMetrics() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const networkSize = (userPosts?.length || 0) * 2
  const networkDensity = Math.min(100, (userPosts?.length || 0) * 3)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌐 Network Metrics</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-cyan-600">{networkSize}</p>
            <p className="text-sm text-gray-600">Network Size</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{networkDensity}%</p>
            <p className="text-sm text-gray-600">Density</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Track your builder network metrics onchain.
        </p>
      </div>
    </div>
  )
}

