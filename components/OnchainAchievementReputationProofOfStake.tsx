'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationProofOfStake() {
  const { address, isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleStake = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'stakeForValidation',
        args: [BigInt(stakeAmount)],
      })
    } catch (error) {
      console.error('Error staking:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⛓️ Proof of Stake</h3>
        <p className="text-gray-600">Connect wallet to stake</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⛓️ Reputation Proof of Stake</h3>
      <p className="text-gray-600 mb-4">
        Stake reputation for validation rights onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Stake Amount</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="10000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleStake}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Staking...' : '⛓️ Stake for Validation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Staked successfully for validation rights
          </div>
        )}
      </div>
    </div>
  )
}
