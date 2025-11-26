'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementEscalationContactProps {
  achievementId: bigint
}

export default function OnchainAchievementEscalationContact({ achievementId }: OnchainAchievementEscalationContactProps) {
  const { address, isConnected } = useAccount()
  const [teamName, setTeamName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [coverageWindow, setCoverageWindow] = useState('24/7')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordContact = async () => {
    if (!isConnected || !address || !teamName.trim() || !contactInfo.trim()) return

    try {
      const payload = `ESCALATION_CONTACT:team:${teamName}:contact:${contactInfo}:window:${coverageWindow || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Escalation contact logging failed:', error)
    }
  }

  return (
    <AppCard title="🆘 Escalation Contact" subtitle="Publish on-call & escalation details" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team / Area *</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Infra oncall, Security response"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Contact *</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="PagerDuty link, phone, email"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Window (optional)</label>
          <input
            type="text"
            value={coverageWindow}
            onChange={(e) => setCoverageWindow(e.target.value)}
            placeholder="24/7, follow-the-sun, weekdays"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordContact}
          disabled={isPending || isConfirming || !isConnected || !teamName.trim() || !contactInfo.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Escalation Contact'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Escalation contact recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
