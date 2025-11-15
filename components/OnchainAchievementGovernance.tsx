'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementGovernance() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [proposal, setProposal] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createProposal = async () => {
    if (!address || !postId || !proposal) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `GOVERNANCE_PROPOSAL: ${proposal}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏛️ Achievement Governance</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Governance proposal"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-24"
        />
        <button
          onClick={createProposal}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Proposal'}
        </button>
        {isSuccess && <p className="text-green-600">Proposal created onchain!</p>}
      </div>
    </div>
  )
}

