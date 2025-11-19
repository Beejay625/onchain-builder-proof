'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDelegationProps {
  achievementId: bigint
}

export default function OnchainAchievementDelegation({ achievementId }: OnchainAchievementDelegationProps) {
  const { address } = useAccount()
  const [delegateAddress, setDelegateAddress] = useState('')
  const [delegationType, setDelegationType] = useState('voting')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const delegateRights = async () => {
    if (!address || !delegateAddress.trim()) return
    
    const delegationData = `DELEGATION: ${delegateAddress} | type: ${delegationType}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, delegationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">👤 Delegation</h3>
      
      <input
        type="text"
        value={delegateAddress}
        onChange={(e) => setDelegateAddress(e.target.value)}
        placeholder="Delegate wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <select
        value={delegationType}
        onChange={(e) => setDelegationType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="voting">Voting Rights</option>
        <option value="management">Management Rights</option>
        <option value="both">Both</option>
      </select>
      
      <button
        onClick={delegateRights}
        disabled={isPending || isConfirming || !delegateAddress.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Delegating...' : 'Delegate Rights Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Delegation recorded onchain
        </div>
      )}
    </div>
  )
}
