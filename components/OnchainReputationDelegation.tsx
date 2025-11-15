'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainReputationDelegationProps {
  achievementId: bigint
}

export default function OnchainReputationDelegation({ achievementId }: OnchainReputationDelegationProps) {
  const { address } = useAccount()
  const [delegateAddress, setDelegateAddress] = useState('')
  const [reputationAmount, setReputationAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const delegateReputation = async () => {
    if (!address || !delegateAddress.trim() || !reputationAmount) return
    
    const delegationData = `REPUTATION_DELEGATION: ${reputationAmount} reputation to ${delegateAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, delegationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎫 Onchain Reputation Delegation</h3>
      
      <input
        type="text"
        value={delegateAddress}
        onChange={(e) => setDelegateAddress(e.target.value)}
        placeholder="Delegate wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <input
        type="number"
        value={reputationAmount}
        onChange={(e) => setReputationAmount(e.target.value)}
        placeholder="Reputation amount to delegate"
        step="1"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={delegateReputation}
        disabled={isPending || isConfirming || !delegateAddress.trim() || !reputationAmount}
        className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Delegating...' : `Delegate ${reputationAmount || '0'} Reputation`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reputation delegation recorded onchain
        </div>
      )}
    </div>
  )
}
