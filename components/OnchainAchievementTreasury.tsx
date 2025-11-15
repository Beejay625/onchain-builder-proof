'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTreasury() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [contribution, setContribution] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const contributeToTreasury = async () => {
    if (!address || !postId || !contribution) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `TREASURY_CONTRIBUTION: ${contribution} ETH`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏦 Achievement Treasury</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          step="0.001"
          placeholder="Contribution amount (ETH)"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={contributeToTreasury}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Contributing...' : 'Contribute to Treasury'}
        </button>
        {isSuccess && <p className="text-green-600">Contribution recorded onchain!</p>}
      </div>
    </div>
  )
}

