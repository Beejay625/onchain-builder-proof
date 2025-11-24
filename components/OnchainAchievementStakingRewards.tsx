'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementStakingRewardsProps {
  achievementId: bigint
}

export default function OnchainAchievementStakingRewards({ achievementId }: OnchainAchievementStakingRewardsProps) {
  const { address } = useAccount()
  const [poolAddress, setPoolAddress] = useState('0xpool')
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [apy, setApy] = useState('12.5%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!poolAddress.trim()) return
    if (!poolAddress.startsWith('0x') || poolAddress.length !== 42) return
    const payload = `StakingRewards|pool:${poolAddress}|token:${tokenAddress}|apy:${apy}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">StakingRewards</h3>
      <p className="text-sm text-gray-600 mb-4">Track StakingRewards operations and reward configurations.</p>
      <div className="space-y-3 mb-4">
        <input value={poolAddress} onChange={(e) => setPoolAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pool address" />
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token address" />
        <input value={apy} onChange={(e) => setApy(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="APY" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !poolAddress.startsWith('0x')} className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record StakingRewards'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">✓ StakingRewards recorded onchain.</div>}
    </section>
  )
}
