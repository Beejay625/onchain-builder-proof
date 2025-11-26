'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCloningProps {
  achievementId: bigint
}

export default function OnchainAchievementCloning({ achievementId }: OnchainAchievementCloningProps) {
  const { address } = useAccount()
  const [cloneName, setCloneName] = useState('')
  const [cloneAsTemplate, setCloneAsTemplate] = useState(false)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const cloneAchievement = async () => {
    if (!address) return
    
    const cloneData = `CLONE:${cloneName.trim() || 'unnamed'}:template:${cloneAsTemplate ? 'yes' : 'no'}:source:${achievementId}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, cloneData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🧬 Achievement Cloning</h3>
      
      <input
        type="text"
        value={cloneName}
        onChange={(e) => setCloneName(e.target.value)}
        placeholder="Clone name (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={cloneAsTemplate}
          onChange={(e) => setCloneAsTemplate(e.target.checked)}
          className="mr-2"
        />
        <span>Clone as reusable template</span>
      </label>
      
      <button
        onClick={cloneAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Cloning...' : 'Clone Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement cloned onchain
        </div>
      )}
    </div>
  )
}





