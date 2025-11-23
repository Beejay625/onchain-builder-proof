'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBalancerPoolProps {
  achievementId: bigint
}

export default function OnchainAchievementBalancerPool({ achievementId }: OnchainAchievementBalancerPoolProps) {
  const { address } = useAccount()
  const [poolAddress, setPoolAddress] = useState('0xpool')
  const [poolType, setPoolType] = useState('BalancerPool')
  const [tvl, setTvl] = useState('1000000')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!poolAddress.trim()) return
    if (!poolAddress.startsWith('0x') || poolAddress.length !== 42) return
    const payload = `BalancerPool|pool:${poolAddress}|type:${poolType}|tvl:${tvl}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">BalancerPool</h3>
      <p className="text-sm text-gray-600 mb-4">Track BalancerPool liquidity pool operations.</p>
      <div className="space-y-3 mb-4">
        <input value={poolAddress} onChange={(e) => setPoolAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pool address" />
        <input value={poolType} onChange={(e) => setPoolType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pool type" />
        <input value={tvl} onChange={(e) => setTvl(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="TVL" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !poolAddress.startsWith('0x')} className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record BalancerPool'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">✓ BalancerPool pool recorded.</div>}
    </section>
  )
}
