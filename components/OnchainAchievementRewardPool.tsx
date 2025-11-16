'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRewardPool() {
  const { address } = useAccount()
  const [poolAmount, setPoolAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const contributeToPool = async () => {
    if (!address || !poolAmount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `POOL: Contributed ${poolAmount} ETH to reward pool`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Achievement Reward Pool</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Amount (ETH)"
          value={poolAmount}
          onChange={(e) => setPoolAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={contributeToPool}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Contributing...' : 'Contribute to Pool'}
        </button>
        {isSuccess && <p className="text-green-600">Contribution recorded onchain!</p>}
      </div>
    </div>
  )
}

