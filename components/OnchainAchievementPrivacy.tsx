'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPrivacyProps {
  achievementId: bigint
}

export default function OnchainAchievementPrivacy({ achievementId }: OnchainAchievementPrivacyProps) {
  const { address } = useAccount()
  const [privacyLevel, setPrivacyLevel] = useState('public')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setPrivacy = async () => {
    if (!address) return
    
    const privacyData = `PRIVACY: ${privacyLevel}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, privacyData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔒 Onchain Privacy Settings</h3>
      
      <select
        value={privacyLevel}
        onChange={(e) => setPrivacyLevel(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="friends">Friends Only</option>
      </select>
      
      <button
        onClick={setPrivacy}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Privacy Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Privacy settings stored onchain
        </div>
      )}
    </div>
  )
}
