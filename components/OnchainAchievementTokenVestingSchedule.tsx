'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTokenVestingScheduleProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenVestingSchedule({ achievementId }: OnchainAchievementTokenVestingScheduleProps) {
  const { address } = useAccount()
  const [totalAmount, setTotalAmount] = useState('10000')
  const [cliffMonths, setCliffMonths] = useState('6')
  const [vestingDuration, setVestingDuration] = useState('24 months')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishSchedule = () => {
    if (!address || !totalAmount.trim()) return

    const payload = `VESTING_SCHEDULE|total:${totalAmount}|cliff:${cliffMonths}|duration:${vestingDuration}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-emerald-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📅 Token Vesting Schedule</h3>
      <p className="text-sm text-gray-600 mb-4">Publish vesting parameters tied to milestone completions.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Total amount" />
        <input value={cliffMonths} onChange={(e) => setCliffMonths(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Cliff (months)" />
        <input value={vestingDuration} onChange={(e) => setVestingDuration(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Duration" />
      </div>

      <button
        onClick={publishSchedule}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing schedule...' : 'Publish vesting schedule'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          ✓ Vesting schedule committed onchain.
        </div>
      )}
    </section>
  )
}
