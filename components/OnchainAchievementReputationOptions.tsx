'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationOptions() {
  const { address, isConnected } = useAccount()
  const [optionType, setOptionType] = useState('call')
  const [strikePrice, setStrikePrice] = useState('')
  const [premium, setPremium] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleCreateOption = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createReputationOption',
        args: [optionType === 'call', BigInt(strikePrice), BigInt(premium)],
      })
    } catch (error) {
      console.error('Error creating option:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🎯 Reputation Options</h3>
        <p className="text-gray-600">Connect wallet to trade options</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🎯 Reputation Options</h3>
      <p className="text-gray-600 mb-4">
        Trade reputation options contracts onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Option Type</label>
          <select
            value={optionType}
            onChange={(e) => setOptionType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="call">Call Option</option>
            <option value="put">Put Option</option>
          </select>
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
          <label className="block text-sm font-medium mb-2">Premium</label>
          <input
            type="text"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            placeholder="0.01"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleCreateOption}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : '🎯 Create Option'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Option contract created successfully
          </div>
        )}
      </div>
    </div>
  )
}
