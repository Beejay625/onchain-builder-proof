'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRaidenNetworkProps {
  achievementId: bigint
}

export default function OnchainAchievementRaidenNetwork({ achievementId }: OnchainAchievementRaidenNetworkProps) {
  const { address } = useAccount()
  const [channelId, setChannelId] = useState('0xchannel')
  const [participant1, setParticipant1] = useState('0xp1')
  const [participant2, setParticipant2] = useState('0xp2')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!channelId.trim() || !channelId.startsWith('0x')) return
    const payload = `RaidenNetwork|channel:${channelId}|p1:${participant1}|p2:${participant2}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">RaidenNetwork</h3>
      <p className="text-sm text-gray-600 mb-4">Track RaidenNetwork off-chain payment channels.</p>
      <div className="space-y-3 mb-4">
        <input value={channelId} onChange={(e) => setChannelId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Channel ID" />
        <input value={participant1} onChange={(e) => setParticipant1(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Participant 1" />
        <input value={participant2} onChange={(e) => setParticipant2(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Participant 2" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !channelId.startsWith('0x')} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record RaidenNetwork'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">✓ RaidenNetwork channel recorded.</div>}
    </section>
  )
}
