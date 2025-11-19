'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRecommendations() {
  const { address } = useAccount()
  
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const recommendations = [
    '🎯 Try adding more details to your achievements',
    '📸 Consider adding visual proof or screenshots',
    '🔗 Link to your projects or repositories',
    '💬 Engage with other builders\' achievements',
    '🏷️ Use keywords to improve discoverability',
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💡 Recommendations</h3>
      
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
            <span className="text-blue-500">→</span>
            <span className="text-gray-700">{rec}</span>
          </li>
        ))}
      </ul>
      
      {userPostIds && userPostIds.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            You have {userPostIds.length} achievement{userPostIds.length !== 1 ? 's' : ''} onchain
          </p>
        </div>
      )}
    </div>
  )
}
