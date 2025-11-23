'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRecognitionProps {
  achievementId: bigint
}

export default function OnchainAchievementRecognition({ achievementId }: OnchainAchievementRecognitionProps) {
  const { address, isConnected } = useAccount()
  const [recognitionType, setRecognitionType] = useState<'award' | 'certification' | 'endorsement' | 'milestone'>('award')
  const [recognitionDetails, setRecognitionDetails] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordRecognition = async () => {
    if (!isConnected || !address || !recognitionDetails.trim()) return

    try {
      const recognitionData = `RECOGNITION:${recognitionType}:${recognitionDetails}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, recognitionData],
      })
    } catch (error) {
      console.error('Recognition recording failed:', error)
    }
  }

  return (
    <AppCard title="🏅 Achievement Recognition" subtitle="Record official recognition" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recognition Type</label>
          <select
            value={recognitionType}
            onChange={(e) => setRecognitionType(e.target.value as typeof recognitionType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="award">Award</option>
            <option value="certification">Certification</option>
            <option value="endorsement">Endorsement</option>
            <option value="milestone">Milestone</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recognition Details *</label>
          <textarea
            value={recognitionDetails}
            onChange={(e) => setRecognitionDetails(e.target.value)}
            placeholder="Describe the recognition received..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={recordRecognition}
          disabled={isPending || isConfirming || !isConnected || !recognitionDetails.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Recognition'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Recognition recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

