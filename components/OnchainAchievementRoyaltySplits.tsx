'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRoyaltySplits() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [recipients, setRecipients] = useState('')
  const [percentages, setPercentages] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const configureSplits = async () => {
    if (!address || !postId || !recipients || !percentages) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `ROYALTY_SPLIT:${recipients}:${percentages}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Royalty Splits</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Recipient addresses (comma-separated)"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Percentages (comma-separated)"
          value={percentages}
          onChange={(e) => setPercentages(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={configureSplits}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Configuring...' : 'Configure Royalty Splits'}
        </button>
        {isSuccess && <p className="text-green-600">Royalty splits configured!</p>}
      </div>
    </div>
  )
}


