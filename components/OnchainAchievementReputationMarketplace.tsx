'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Reputation Marketplace
 * Trade reputation tokens onchain
 */
export default function OnchainAchievementReputationMarketplace() {
  const { address, isConnected } = useAccount()
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isListing, setIsListing] = useState(true)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleMarketplaceAction = async () => {
    if (!isConnected || !address) return

    try {
      if (isListing) {
        writeContract({
          address: BUILDER_PROOF_CONTRACT as `0x${string}`,
          abi: BuilderProofABI,
          functionName: 'listReputationForSale',
          args: [BigInt(amount), BigInt(price)],
        })
      } else {
        writeContract({
          address: BUILDER_PROOF_CONTRACT as `0x${string}`,
          abi: BuilderProofABI,
          functionName: 'buyReputation',
          args: [BigInt(amount)],
          value: BigInt(price),
        })
      }
    } catch (error) {
      console.error('Error with marketplace action:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">💰 Reputation Marketplace</h3>
        <p className="text-gray-600">Connect wallet to trade reputation</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">💰 Reputation Marketplace</h3>
      <p className="text-gray-600 mb-4">
        Trade reputation tokens onchain marketplace
      </p>
      
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setIsListing(true)}
            className={`flex-1 px-4 py-2 rounded-lg ${isListing ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            List for Sale
          </button>
          <button
            onClick={() => setIsListing(false)}
            className={`flex-1 px-4 py-2 rounded-lg ${!isListing ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Buy Reputation
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Price (ETH)</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleMarketplaceAction}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : isListing ? '💰 List for Sale' : '💰 Buy Reputation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ {isListing ? 'Listed' : 'Purchased'} successfully
          </div>
        )}
      </div>
    </div>
  )
}

