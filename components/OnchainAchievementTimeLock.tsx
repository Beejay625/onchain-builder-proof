'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTimeLockProps {
  achievementId: bigint
}

export default function OnchainAchievementTimeLock({ achievementId }: OnchainAchievementTimeLockProps) {
  const { address } = useAccount()
  const [target, setTarget] = useState('0xtarget')
  const [value, setValue] = useState('0')
  const [delay, setDelay] = useState('48 hours')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordTimeLock = () => {
    if (!address) return
    if (!target.trim() || !target.startsWith('0x')) return

    const payload = `TIMELOCK|target:${target}|value:${value}|delay:${delay}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-slate-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⏰ Time Lock</h3>
      <p className="text-sm text-gray-600 mb-4">Record time-locked transactions for delayed execution.</p>

      <div className="space-y-3 mb-4">
        <input value={target} onChange={(e) => setTarget(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-slate-500" placeholder="Target address" />
        <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Value" />
        <input value={delay} onChange={(e) => setDelay(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Delay period" />
      </div>

      <button
        onClick={recordTimeLock}
        disabled={isPending || isConfirming || !address || !target.startsWith('0x')}
        className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record time lock'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
          ✓ Time lock transaction recorded.
        </div>
      )}
    </section>
  )
}
