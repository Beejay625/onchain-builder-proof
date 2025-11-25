'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function KeyCeremonyProofs() {
  const { address, isConnected } = useAccount()
  const [ceremonyDate, setCeremonyDate] = useState('2025-01-05')
  const [participants, setParticipants] = useState(4)
  const [notes, setNotes] = useState('rotated session keys')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('keyCeremonyProofs')) {
    return null
  }

  const handlePublish = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Key Ceremony
Date: ${ceremonyDate}
Participants: ${participants}
Notes: ${notes}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Key ceremony proof failed:', error)
    }
  }

  return (
    <AppCard title="🗝️ Key Ceremony Proofs" subtitle="Attest key generation & rotation rituals." accent="gray">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={ceremonyDate}
              onChange={(e) => setCeremonyDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Participants</label>
            <input
              type="number"
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <button
          onClick={handlePublish}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Key ceremony proof anchored
          </div>
        )}
      </div>
    </AppCard>
  )
}

