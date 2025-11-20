'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementProofLinksProps {
  achievementId: bigint
}

export default function OnchainAchievementProofLinks({ achievementId }: OnchainAchievementProofLinksProps) {
  const { address } = useAccount()
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const basescanUrl = `https://basescan.org/address/${BUILDER_PROOF_CONTRACT}`

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Proof Links</h3>
      
      <div className="space-y-3">
        <a
          href={basescanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
        >
          <p className="font-semibold text-blue-700">BaseScan</p>
          <p className="text-xs text-gray-600">View on BaseScan explorer</p>
        </a>
        
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="font-semibold text-gray-700">Contract Address</p>
          <p className="text-xs font-mono text-gray-600 break-all">{BUILDER_PROOF_CONTRACT}</p>
        </div>
        
        {post && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-700">Achievement ID</p>
            <p className="text-xs text-gray-600">#{post.id.toString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}
