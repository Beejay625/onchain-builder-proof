'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationUndelegation() {
  const { address, isConnected } = useAccount()
  const [delegateAddress, setDelegateAddress] = useState('')
  const [undelegateAmount, setUndelegateAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleUndelegate = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'undelegateReputation',
        args: [delegateAddress as `0x${string}`, BigInt(undelegateAmount)],
      })
    } catch (error) {
      console.error('Error undelegating:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">↩️ Undelegation</h3>
        <p className="text-gray-600">Connect wallet to undelegate</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">↩️ Reputation Undelegation</h3>
      <p className="text-gray-600 mb-4">
        Undelegate reputation from a delegate address onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Delegate Address</label>
          <input
            type="text"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Undelegate Amount</label>
          <input
            type="number"
            value={undelegateAmount}
            onChange={(e) => setUndelegateAmount(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleUndelegate}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Undelegating...' : '↩️ Undelegate'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation undelegated successfully
          </div>
        )}
      </div>
    </div>
  )
}
