'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementQuestSchedulerProps {
  achievementId: bigint
}

export default function OnchainAchievementQuestScheduler({ achievementId }: OnchainAchievementQuestSchedulerProps) {
  const { address } = useAccount()
  const [questName, setQuestName] = useState('Modular Rollup Integration')
  const [startDate, setStartDate] = useState('2024-06-01')
  const [endDate, setEndDate] = useState('2024-06-30')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const scheduleQuest = () => {
    if (!address || !questName.trim()) return

    const payload = `QUEST_SCHEDULE|name:${questName}|start:${startDate}|end:${endDate}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-emerald-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🗓 Quest Scheduler</h3>
      <p className="text-sm text-gray-600 mb-4">Sync onchain quests with builder achievements for automated cadence.</p>

      <div className="space-y-3 mb-4">
        <input value={questName} onChange={(e) => setQuestName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Quest name" />
        <input value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Start date" />
        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="End date" />
      </div>

      <button
        onClick={scheduleQuest}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Scheduling...' : 'Schedule quest'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          ✓ Quest schedule logged for automations.
        </div>
      )}
    </section>
  )
}
