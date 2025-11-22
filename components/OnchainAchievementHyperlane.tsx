'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementHyperlaneProps {
  achievementId: bigint
}

export default function OnchainAchievementHyperlane({ achievementId }: OnchainAchievementHyperlaneProps) {
  const { address } = useAccount()
  const [sourceChain, setSourceChain] = useState('Base')
  const [targetChain, setTargetChain] = useState('Ethereum')
  const [messageId, setMessageId] = useState('0xmessage')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!messageId.trim() || !messageId.startsWith('0x')) return
    const payload = `Hyperlane|from:${sourceChain}|to:${targetChain}|id:${messageId}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">Hyperlane</h3>
      <p className="text-sm text-gray-600 mb-4">Track Hyperlane cross-chain message passing.</p>
      <div className="space-y-3 mb-4">
        <input value={sourceChain} onChange={(e) => setSourceChain(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Source chain" />
        <input value={targetChain} onChange={(e) => setTargetChain(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Target chain" />
        <input value={messageId} onChange={(e) => setMessageId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Message ID" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !messageId.startsWith('0x')} className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record Hyperlane'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">✓ Hyperlane message recorded.</div>}
    </section>
  )
}
