'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLogParsingProps {
  achievementId: bigint
}

export default function OnchainAchievementLogParsing({ achievementId }: OnchainAchievementLogParsingProps) {
  const { address } = useAccount()
  const [txHash, setTxHash] = useState('0xtx')
  const [logIndex, setLogIndex] = useState('0')
  const [eventSignature, setEventSignature] = useState('Transfer(address,address,uint256)')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordParsing = () => {
    if (!address) return
    if (!txHash.trim()) return
    if (!logIndex.trim() || isNaN(Number(logIndex))) return
    if (!txHash.startsWith('0x') || txHash.length !== 66) return

    const payload = `LOG_PARSING|tx:${txHash}|logIndex:${logIndex}|event:${eventSignature}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-orange-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📋 Log Parsing</h3>
      <p className="text-sm text-gray-600 mb-4">Record transaction log parsing and event extraction operations.</p>

      <div className="space-y-3 mb-4">
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500" placeholder="Transaction hash" />
        <input value={logIndex} onChange={(e) => setLogIndex(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Log index" />
        <input value={eventSignature} onChange={(e) => setEventSignature(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Event signature" />
      </div>

      <button
        onClick={recordParsing}
        disabled={isPending || isConfirming || !address || !txHash.startsWith('0x')}
        className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record log parsing'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
          ✓ Log parsing recorded onchain.
        </div>
      )}
    </section>
  )
}
