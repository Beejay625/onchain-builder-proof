'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEventIndexingProps {
  achievementId: bigint
}

export default function OnchainAchievementEventIndexing({ achievementId }: OnchainAchievementEventIndexingProps) {
  const { address } = useAccount()
  const [data, setData] = useState('')
  const [index, setIndex] = useState('0')
  const [timestamp, setTimestamp] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!data.trim()) return
    const payload = `EventIndexing|data:${data}|index:${index}|timestamp:${timestamp}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">EventIndexing</h3>
      <p className="text-sm text-gray-600 mb-4">Track EventIndexing operations and configurations.</p>
      <div className="space-y-3 mb-4">
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
        <input value={index} onChange={(e) => setIndex(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Index" />
        <input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Timestamp" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !data.trim()} className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record EventIndexing'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">✓ EventIndexing recorded onchain.</div>}
    </section>
  )
}
