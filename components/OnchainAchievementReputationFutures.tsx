'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationFutures() {
  const { address, isConnected } = useAccount()
  const [contractSize, setContractSize] = useState('')
  const [strikePrice, setStrikePrice] = useState('')
  const [expiry, setExpiry] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleCreateFutures = async () => {
    if (!isConnected || !address) return
    
    const expiryTimestamp = Math.floor(new Date(expiry).getTime() / 1000)

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createReputationFutures',
        args: [BigInt(contractSize), BigInt(strikePrice), BigInt(expiryTimestamp)],
      })
    } catch (error) {
      console.error('Error creating futures:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📈 Reputation Futures</h3>
        <p className="text-gray-600">Connect wallet to trade futures</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📈 Reputation Futures</h3>
      <p className="text-gray-600 mb-4">
        Trade reputation futures contracts onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Contract Size</label>
          <input
            type="number"
            value={contractSize}
            onChange={(e) => setContractSize(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Strike Price</label>
          <input
            type="text"
            value={strikePrice}
            onChange={(e) => setStrikePrice(e.target.value)}
            placeholder="0.1"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Expiry Date</label>
          <input
            type="datetime-local"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleCreateFutures}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : '📈 Create Futures Contract'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Futures contract created successfully
          </div>
        )}
      </div>
    </div>
  )
}
