'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementModularEscrowProps {
  achievementId: bigint
}

export default function OnchainAchievementModularEscrow({ achievementId }: OnchainAchievementModularEscrowProps) {
  const { address } = useAccount()
  const [escrowType, setEscrowType] = useState('milestone')
  const [releaseCondition, setReleaseCondition] = useState('')
  const [escrowAmount, setEscrowAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createEscrow = async () => {
    if (!address || !releaseCondition.trim()) return
    
    const escrowData = `MODULAR_ESCROW:type:${escrowType}:condition:${releaseCondition.trim()}:amount:${escrowAmount.trim() || '0'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, escrowData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔒 Modular Escrow</h3>
      
      <select
        value={escrowType}
        onChange={(e) => setEscrowType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="milestone">Milestone</option>
        <option value="time-based">Time-Based</option>
        <option value="condition-based">Condition-Based</option>
        <option value="multi-party">Multi-Party</option>
      </select>
      
      <input
        type="text"
        value={releaseCondition}
        onChange={(e) => setReleaseCondition(e.target.value)}
        placeholder="Release condition"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={escrowAmount}
        onChange={(e) => setEscrowAmount(e.target.value)}
        placeholder="Escrow amount (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createEscrow}
        disabled={isPending || isConfirming || !releaseCondition.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Escrow Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Escrow created onchain
        </div>
      )}
    </div>
  )
}
