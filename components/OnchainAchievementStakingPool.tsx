'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementStakingPool() {
  const { address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  const [duration, setDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const stakeETH = async () => {
    if (!address || !stakeAmount || !duration) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `STAKE: ${stakeAmount} ETH for ${duration} days`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔒 Staking Pool</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Stake amount (ETH)"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Duration (days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={stakeETH}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Staking...' : 'Stake ETH'}
        </button>
        {isSuccess && <p className="text-green-600">Stake recorded onchain!</p>}
      </div>
    </div>
  )
}

