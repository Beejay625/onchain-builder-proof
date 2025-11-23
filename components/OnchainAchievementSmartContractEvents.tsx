'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSmartContractEventsProps {
  achievementId: bigint
}

export default function OnchainAchievementSmartContractEvents({ achievementId }: OnchainAchievementSmartContractEventsProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [eventName, setEventName] = useState('Transfer')
  const [eventData, setEventData] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordEvent = () => {
    if (!address) return
    if (!contractAddress.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return

    const payload = `SMART_CONTRACT_EVENTS|contract:${contractAddress}|event:${eventName}|data:${eventData}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📡 Smart Contract Events</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract event emissions for off-chain indexing.</p>

      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Contract address" />
        <input value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Event name" />
        <input value={eventData} onChange={(e) => setEventData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Event data" />
      </div>

      <button
        onClick={recordEvent}
        disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record contract event'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Smart contract event recorded onchain.
        </div>
      )}
    </section>
  )
}
