'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Subscription Feed
 * Subscribe to builder feeds and receive updates onchain
 */
export default function OnchainAchievementSubscriptionFeed() {
  const { address, isConnected } = useAccount()
  const [builderAddress, setBuilderAddress] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleSubscribe = async () => {
    if (!isConnected || !address) return
    
    if (!builderAddress.startsWith('0x') || builderAddress.length !== 42) {
      alert('Invalid builder address')
      return
    }

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: isSubscribed ? 'unsubscribeFromBuilder' : 'subscribeToBuilder',
        args: [builderAddress as `0x${string}`],
      })
    } catch (error) {
      console.error('Error subscribing:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📡 Subscription Feed</h3>
        <p className="text-gray-600">Connect wallet to subscribe</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📡 Subscription Feed</h3>
      <p className="text-gray-600 mb-4">
        Subscribe to builder feeds and receive updates onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Builder Address</label>
          <input
            type="text"
            value={builderAddress}
            onChange={(e) => setBuilderAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSubscribe}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : isSubscribed ? '📡 Unsubscribe' : '📡 Subscribe'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ {isSubscribed ? 'Unsubscribed' : 'Subscribed'} successfully
          </div>
        )}
      </div>
    </div>
  )
}





