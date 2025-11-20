'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationLiquidityMining() {
  const { address, isConnected } = useAccount()
  const [lpTokenAmount, setLpTokenAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleMine = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'mineReputationFromLP',
        args: [BigInt(lpTokenAmount)],
      })
    } catch (error) {
      console.error('Error mining:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⛏️ Liquidity Mining</h3>
        <p className="text-gray-600">Connect wallet to mine</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⛏️ Reputation Liquidity Mining</h3>
      <p className="text-gray-600 mb-4">
        Mine reputation from liquidity pool tokens onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">LP Token Amount</label>
          <input
            type="number"
            value={lpTokenAmount}
            onChange={(e) => setLpTokenAmount(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleMine}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Mining...' : '⛏️ Mine Reputation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation mined successfully
          </div>
        )}
      </div>
    </div>
  )
}
