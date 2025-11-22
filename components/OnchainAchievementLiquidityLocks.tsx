'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLiquidityLocksProps {
  achievementId: bigint
}

export default function OnchainAchievementLiquidityLocks({ achievementId }: OnchainAchievementLiquidityLocksProps) {
  const { address } = useAccount()
  const [poolAddress, setPoolAddress] = useState('0xpool')
  const [lockAmount, setLockAmount] = useState('50000')
  const [unlockDate, setUnlockDate] = useState('2025-12-31T00:00:00Z')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordLock = () => {
    if (!address || !poolAddress.trim()) return

    const payload = `LIQUIDITY_LOCK|pool:${poolAddress}|amount:${lockAmount}|unlock:${unlockDate}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-teal-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔒 Liquidity Locks</h3>
      <p className="text-sm text-gray-600 mb-4">Document liquidity commitments tied to achievement milestones.</p>

      <div className="space-y-3 mb-4">
        <input value={poolAddress} onChange={(e) => setPoolAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pool address" />
        <input value={lockAmount} onChange={(e) => setLockAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Lock amount" />
        <input value={unlockDate} onChange={(e) => setUnlockDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Unlock date" />
      </div>

      <button
        onClick={recordLock}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording lock...' : 'Record liquidity lock'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">
          ✓ Liquidity lock commitment stored.
        </div>
      )}
    </section>
  )
}
