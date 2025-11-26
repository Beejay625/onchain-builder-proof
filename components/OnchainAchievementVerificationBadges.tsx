'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementVerificationBadges() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [badgeType, setBadgeType] = useState('verified')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleIssueBadge = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'issueVerificationBadge',
        args: [BigInt(postId), badgeType],
      })
    } catch (error) {
      console.error('Error issuing badge:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">✓ Verification Badges</h3>
        <p className="text-gray-600">Connect wallet to issue badges</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">✓ Onchain Verification Badges</h3>
      <p className="text-gray-600 mb-4">
        Issue verification badges for achievements onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Achievement ID</label>
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter achievement ID"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Badge Type</label>
          <select
            value={badgeType}
            onChange={(e) => setBadgeType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="verified">Verified</option>
            <option value="premium">Premium</option>
            <option value="elite">Elite</option>
          </select>
        </div>

        <button
          onClick={handleIssueBadge}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Issuing...' : '✓ Issue Badge'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Verification badge issued successfully
          </div>
        )}
      </div>
    </div>
  )
}





