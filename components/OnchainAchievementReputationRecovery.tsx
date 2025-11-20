'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationRecovery() {
  const { address, isConnected } = useAccount()
  const [recoveryAmount, setRecoveryAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleRecover = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'recoverReputation',
        args: [BigInt(recoveryAmount)],
      })
    } catch (error) {
      console.error('Error recovering reputation:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📈 Reputation Recovery</h3>
        <p className="text-gray-600">Connect wallet to recover reputation</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📈 Reputation Recovery</h3>
      <p className="text-gray-600 mb-4">
        Recover reputation through verified achievements onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Recovery Amount</label>
          <input
            type="number"
            value={recoveryAmount}
            onChange={(e) => setRecoveryAmount(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleRecover}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recovering...' : '📈 Recover Reputation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation recovered successfully
          </div>
        )}
      </div>
    </div>
  )
}
