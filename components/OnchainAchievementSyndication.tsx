'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSyndication() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [platform, setPlatform] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const syndicate = async () => {
    if (!address || !postId || !platform) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `SYNDICATE:${platform}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📡 Syndication</h2>
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
          placeholder="Platform name"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={syndicate}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Syndicating...' : 'Syndicate Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement syndicated onchain!</p>}
      </div>
    </div>
  )
}





