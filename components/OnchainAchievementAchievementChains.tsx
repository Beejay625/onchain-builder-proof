'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementChains() {
  const { address } = useAccount()
  const [parentId, setParentId] = useState('')
  const [childId, setChildId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const linkAchievements = async () => {
    if (!address || !parentId || !childId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(parentId), `CHAIN:${childId}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⛓️ Achievement Chains</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Parent achievement ID"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Child achievement ID"
          value={childId}
          onChange={(e) => setChildId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={linkAchievements}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Linking...' : 'Link Achievements'}
        </button>
        {isSuccess && <p className="text-green-600">Achievements chained onchain!</p>}
      </div>
    </div>
  )
}

