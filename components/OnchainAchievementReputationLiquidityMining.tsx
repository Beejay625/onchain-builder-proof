'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationLiquidityMining() {
  const { address } = useAccount()
  const [lpAmount, setLpAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const stakeLP = async () => {
    if (!address || !lpAmount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `LPMINE: ${lpAmount} LP tokens staked`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⛏️ Liquidity Mining</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="LP token amount"
          value={lpAmount}
          onChange={(e) => setLpAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={stakeLP}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Staking...' : 'Stake LP Tokens'}
        </button>
        {isSuccess && <p className="text-green-600">LP tokens staked!</p>}
      </div>
    </div>
  )
}

