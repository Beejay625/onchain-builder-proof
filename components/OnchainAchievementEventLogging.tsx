'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEventLoggingProps {
  achievementId: bigint
}

export default function OnchainAchievementEventLogging({ achievementId }: OnchainAchievementEventLoggingProps) {
  const { address } = useAccount()
  const [eventName, setEventName] = useState('Transfer')
  const [eventSignature, setEventSignature] = useState('0x...')
  const [indexedParams, setIndexedParams] = useState('3')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordEvent = () => {
    if (!address || !eventName.trim()) return

    const payload = `EVENT_LOGGING|name:${eventName}|sig:${eventSignature}|indexed:${indexedParams}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-teal-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📝 Event Logging</h3>
      <p className="text-sm text-gray-600 mb-4">Document custom event emissions for off-chain indexing.</p>

      <div className="space-y-3 mb-4">
        <input value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Event name" />
        <input value={eventSignature} onChange={(e) => setEventSignature(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Event signature" type="text" />
        <input value={indexedParams} onChange={(e) => setIndexedParams(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Indexed params" />
      </div>

      <button
        onClick={recordEvent}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record event logging'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">
          ✓ Event logging configuration stored.
        </div>
      )}
    </section>
  )
}
