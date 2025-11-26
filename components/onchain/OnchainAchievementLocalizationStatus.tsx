'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementLocalizationStatusProps {
  achievementId: bigint
}

export default function OnchainAchievementLocalizationStatus({ achievementId }: OnchainAchievementLocalizationStatusProps) {
  const { address, isConnected } = useAccount()
  const [languageCode, setLanguageCode] = useState('')
  const [localizationStatus, setLocalizationStatus] = useState<'not-started' | 'in-progress' | 'beta' | 'shipped'>('not-started')
  const [localizationNotes, setLocalizationNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordLocalization = async () => {
    if (!isConnected || !address || !languageCode.trim()) return

    try {
      const payload = `LOCALIZATION_STATUS:language:${languageCode}:status:${localizationStatus}:note:${localizationNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Localization status logging failed:', error)
    }
  }

  return (
    <AppCard title="🌍 Localization Status" subtitle="Track localization readiness per language" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language Code *</label>
          <input
            type="text"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value.toUpperCase())}
            placeholder="ES, PT-BR, ID"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={localizationStatus}
            onChange={(e) => setLocalizationStatus(e.target.value as typeof localizationStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="beta">Beta</option>
            <option value="shipped">Shipped</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={localizationNotes}
            onChange={(e) => setLocalizationNotes(e.target.value)}
            rows={3}
            placeholder="Pending proofreading, need glossary updates"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordLocalization}
          disabled={isPending || isConfirming || !isConnected || !languageCode.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving...' : 'Save Localization Status'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Localization status recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
