'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLiquidityPoolStakingProps {
  achievementId: bigint
}

export default function OnchainAchievementLiquidityPoolStaking({ achievementId }: OnchainAchievementLiquidityPoolStakingProps) {
  const { address } = useAccount()
  const [poolAddress, setPoolAddress] = useState('')
  const [stakeAmount, setStakeAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordStake = () => {
    if (!address || !poolAddress.trim() || !stakeAmount.trim()) return

    const payload = `LIQUIDITY_STAKE|pool:${poolAddress}|amount:${stakeAmount}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💧 Liquidity Pool Staking</h3>
      <p className="text-sm text-gray-600 mb-4">Record liquidity staking commitments tied to achievements.</p>

      <div className="space-y-3 mb-4">
        <input 
          value={poolAddress} 
          onChange={(e) => setPoolAddress(e.target.value)} 
          className="w-full border border-gray-300 rounded-lg p-2" 
          placeholder="Pool address" 
        />
        <input 
          value={stakeAmount} 
          onChange={(e) => setStakeAmount(e.target.value)} 
          className="w-full border border-gray-300 rounded-lg p-2" 
          placeholder="Stake amount" 
        />
      </div>

      <button
        onClick={recordStake}
        disabled={isPending || isConfirming || !poolAddress.trim() || !stakeAmount.trim()}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record liquidity stake'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Liquidity stake recorded onchain.
        </div>
      )}
    </section>
  )
}
