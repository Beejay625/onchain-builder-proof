'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Time Capsule
 * Lock achievements for future reveal at a specific timestamp
 */
export default function OnchainAchievementTimeCapsule() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [unlockTimestamp, setUnlockTimestamp] = useState('')
  const [isLocking, setIsLocking] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleLockAchievement = async () => {
    if (!isConnected || !address) return
    
    const timestamp = Math.floor(new Date(unlockTimestamp).getTime() / 1000)
    if (timestamp <= Date.now() / 1000) {
      alert('Unlock timestamp must be in the future')
      return
    }

    setIsLocking(true)
    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'lockAchievement',
        args: [BigInt(postId), BigInt(timestamp)],
      })
    } catch (error) {
      console.error('Error locking achievement:', error)
      setIsLocking(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⏰ Time Capsule</h3>
        <p className="text-gray-600">Connect wallet to lock achievements</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⏰ Onchain Achievement Time Capsule</h3>
      <p className="text-gray-600 mb-4">
        Lock achievements onchain for future reveal at a specific timestamp
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
          <label className="block text-sm font-medium mb-2">Unlock Date & Time</label>
          <input
            type="datetime-local"
            value={unlockTimestamp}
            onChange={(e) => setUnlockTimestamp(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleLockAchievement}
          disabled={isPending || isConfirming || isLocking}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Locking...' : '🔒 Lock Achievement'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Achievement locked onchain until {unlockTimestamp}
          </div>
        )}
      </div>
    </div>
  )
}

