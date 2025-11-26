'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementUserTestSessionProps {
  achievementId: bigint
}

export default function OnchainAchievementUserTestSession({ achievementId }: OnchainAchievementUserTestSessionProps) {
  const { address, isConnected } = useAccount()
  const [testPersona, setTestPersona] = useState('')
  const [keyInsight, setKeyInsight] = useState('')
  const [recordingLink, setRecordingLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logSession = async () => {
    if (!isConnected || !address || !testPersona.trim() || !keyInsight.trim()) return

    try {
      const payload = `USER_TEST:persona:${testPersona}:insight:${keyInsight}:link:${recordingLink || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('User test session logging failed:', error)
    }
  }

  return (
    <AppCard title="🧑‍💻 User Test Session" subtitle="Capture usability test learnings" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Persona *</label>
          <input
            type="text"
            value={testPersona}
            onChange={(e) => setTestPersona(e.target.value)}
            placeholder="Power builder, newbie, partner"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Insight *</label>
          <textarea
            value={keyInsight}
            onChange={(e) => setKeyInsight(e.target.value)}
            rows={3}
            placeholder="Need faster wallet connect, confused by jargon"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recording Link (optional)</label>
          <input
            type="text"
            value={recordingLink}
            onChange={(e) => setRecordingLink(e.target.value)}
            placeholder="Loom or Descript link"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={logSession}
          disabled={isPending || isConfirming || !isConnected || !testPersona.trim() || !keyInsight.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log User Test Session'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ User test session captured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
