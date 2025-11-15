'use client'

import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function Analytics() {
  // Query total statistics from blockchain
  const { data: totalPosts } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  const { data: totalComments } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalComments',
  })

  const { data: totalReactions } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalReactions',
  })

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white shadow-xl">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        📊 Live Blockchain Analytics
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{totalPosts?.toString() || '0'}</div>
          <div className="text-sm opacity-90">Achievements Minted</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{totalComments?.toString() || '0'}</div>
          <div className="text-sm opacity-90">Comments Onchain</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{totalReactions?.toString() || '0'}</div>
          <div className="text-sm opacity-90">Total Reactions</div>
        </div>
      </div>
      <p className="text-xs mt-4 opacity-75 text-center">
        All data verified on Base blockchain
      </p>
    </div>
  )
}
