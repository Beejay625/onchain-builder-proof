'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationAutoCompounding() {
  const { address, isConnected } = useAccount()
  const [enableAutoCompound, setEnableAutoCompound] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleToggleAutoCompound = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'setAutoCompounding',
        args: [!enableAutoCompound],
      })
    } catch (error) {
      console.error('Error toggling auto-compound:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔄 Auto-Compounding</h3>
        <p className="text-gray-600">Connect wallet to enable</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔄 Reputation Auto-Compounding</h3>
      <p className="text-gray-600 mb-4">
        Automatic yield compounding for reputation tokens onchain
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={enableAutoCompound}
            onChange={(e) => setEnableAutoCompound(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">Enable auto-compounding</label>
        </div>

        <button
          onClick={handleToggleAutoCompound}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating...' : '🔄 Toggle Auto-Compound'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Auto-compounding {enableAutoCompound ? 'enabled' : 'disabled'}
          </div>
        )}
      </div>
    </div>
  )
}
