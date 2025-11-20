'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementLinkingProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementLinking({ achievementId }: OnchainAchievementAchievementLinkingProps) {
  const { address } = useAccount()
  const [linkedAchievementId, setLinkedAchievementId] = useState('')
  const [linkType, setLinkType] = useState('related')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const linkAchievements = async () => {
    if (!address || !linkedAchievementId.trim()) return
    
    const linkData = `ACHIEVEMENT_LINK: ${linkedAchievementId} | type: ${linkType}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, linkData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Achievement Linking</h3>
      
      <input
        type="number"
        value={linkedAchievementId}
        onChange={(e) => setLinkedAchievementId(e.target.value)}
        placeholder="Linked achievement ID"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={linkType}
        onChange={(e) => setLinkType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="related">Related</option>
        <option value="prerequisite">Prerequisite</option>
        <option value="follow-up">Follow-up</option>
        <option value="series">Series</option>
      </select>
      
      <button
        onClick={linkAchievements}
        disabled={isPending || isConfirming || !linkedAchievementId.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Linking...' : 'Link Achievements Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievements linked onchain
        </div>
      )}
    </div>
  )
}

