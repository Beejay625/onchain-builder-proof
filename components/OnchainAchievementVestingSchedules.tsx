'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementVestingSchedulesProps {
  achievementId: bigint
}

export default function OnchainAchievementVestingSchedules({ achievementId }: OnchainAchievementVestingSchedulesProps) {
  const { address } = useAccount()
  const [vestingAddress, setVestingAddress] = useState('0xvesting')
  const [beneficiary, setBeneficiary] = useState('0xbeneficiary')
  const [totalAmount, setTotalAmount] = useState('1000000')
  const [duration, setDuration] = useState('365')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordVesting = () => {
    if (!address) return
    if (!vestingAddress.trim()) return
    if (!vestingAddress.startsWith('0x') || vestingAddress.length !== 42) return

    const payload = `VESTING_SCHEDULES|vesting:${vestingAddress}|beneficiary:${beneficiary}|amount:${totalAmount}|duration:${duration}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-emerald-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📅 Vesting Schedules</h3>
      <p className="text-sm text-gray-600 mb-4">Record token vesting schedule configurations and beneficiaries.</p>

      <div className="space-y-3 mb-4">
        <input value={vestingAddress} onChange={(e) => setVestingAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500" placeholder="Vesting contract address" />
        <input value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Beneficiary address" />
        <input value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Total amount" />
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Duration (days)" min="1" />
      </div>

      <button
        onClick={recordVesting}
        disabled={isPending || isConfirming || !address || !vestingAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record vesting schedule'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          ✓ Vesting schedule recorded onchain.
        </div>
      )}
    </section>
  )
}
