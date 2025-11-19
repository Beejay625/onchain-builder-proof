'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationSwaps() {
  const { address, isConnected } = useAccount()
  const [swapAmount, setSwapAmount] = useState('')
  const [targetToken, setTargetToken] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleSwapReputation = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'swapReputation',
        args: [BigInt(swapAmount), targetToken],
      })
    } catch (error) {
      console.error('Error swapping reputation:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔄 Reputation Swaps</h3>
        <p className="text-gray-600">Connect wallet to swap reputation</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔄 Reputation Swaps</h3>
      <p className="text-gray-600 mb-4">
        Swap reputation tokens with other tokens onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Swap Amount</label>
          <input
            type="number"
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Target Token</label>
          <input
            type="text"
            value={targetToken}
            onChange={(e) => setTargetToken(e.target.value)}
            placeholder="Token address or symbol"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSwapReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Swapping...' : '🔄 Swap Reputation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation swapped successfully
          </div>
        )}
      </div>
    </div>
  )
}
