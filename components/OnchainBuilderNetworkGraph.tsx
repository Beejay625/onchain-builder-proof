'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderNetworkGraph() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const networkNodes = (userPosts?.length || 0) * 3

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🕸️ Network Graph</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-cyan-600">{networkNodes}</p>
          <p className="text-gray-600">Network Nodes</p>
        </div>
        <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">Network Visualization</p>
        </div>
        <p className="text-sm text-gray-500">
          Visualize your builder network connections.
        </p>
      </div>
    </div>
  )
}

