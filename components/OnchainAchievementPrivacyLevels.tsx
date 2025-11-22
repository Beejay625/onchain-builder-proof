'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Privacy Levels
 * Control visibility of achievements with privacy settings
 */
export default function OnchainAchievementPrivacyLevels() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [privacyLevel, setPrivacyLevel] = useState('public')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const privacyLevels = [
    { value: 'public', label: 'Public - Visible to everyone' },
    { value: 'followers', label: 'Followers Only' },
    { value: 'private', label: 'Private - Only you' },
  ]

  const handleSetPrivacy = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'setPrivacyLevel',
        args: [BigInt(postId), privacyLevel],
      })
    } catch (error) {
      console.error('Error setting privacy:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔒 Privacy Levels</h3>
        <p className="text-gray-600">Connect wallet to manage privacy</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔒 Onchain Privacy Levels</h3>
      <p className="text-gray-600 mb-4">
        Control visibility of achievements with privacy settings
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
          <label className="block text-sm font-medium mb-2">Privacy Level</label>
          <select
            value={privacyLevel}
            onChange={(e) => setPrivacyLevel(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {privacyLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSetPrivacy}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating...' : '🔒 Set Privacy Level'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Privacy level updated
          </div>
        )}
      </div>
    </div>
  )
}


