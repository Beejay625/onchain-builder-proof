'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementLinking() {
  const { address } = useAccount()
  const [linkedPostId, setLinkedPostId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const linkAchievement = async () => {
    if (!address || !linkedPostId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(linkedPostId), 'LINK: Related achievement'],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Achievement Linking</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Linked post ID"
          value={linkedPostId}
          onChange={(e) => setLinkedPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={linkAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Linking...' : 'Link Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Linked onchain!</p>}
      </div>
    </div>
  )
}
