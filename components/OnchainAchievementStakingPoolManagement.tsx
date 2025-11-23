'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementStakingPoolManagementProps {
  achievementId: bigint
}

export default function OnchainAchievementStakingPoolManagement({ achievementId }: OnchainAchievementStakingPoolManagementProps) {
  const { address } = useAccount()
  const [poolAddress, setPoolAddress] = useState('0xpool')
  const [totalStaked, setTotalStaked] = useState('1000000')
  const [apy, setApy] = useState('12.5%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordPool = () => {
    if (!address) return
    if (!poolAddress.trim()) return
    if (!totalStaked.trim() || isNaN(Number(totalStaked))) return
    if (!poolAddress.startsWith('0x') || poolAddress.length !== 42) return

    const payload = `STAKING_POOL_MANAGEMENT|pool:${poolAddress}|totalStaked:${totalStaked}|apy:${apy}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-emerald-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🏊 Staking Pool Management</h3>
      <p className="text-sm text-gray-600 mb-4">Record staking pool configurations and metrics.</p>

      <div className="space-y-3 mb-4">
        <input value={poolAddress} onChange={(e) => setPoolAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500" placeholder="Pool address" />
        <input value={totalStaked} onChange={(e) => setTotalStaked(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Total staked" />
        <input value={apy} onChange={(e) => setApy(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="APY" />
      </div>

      <button
        onClick={recordPool}
        disabled={isPending || isConfirming || !address || !poolAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record staking pool'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          ✓ Staking pool recorded onchain.
        </div>
      )}
    </section>
  )
}
