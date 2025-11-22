'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementOracleFeedsProps {
  achievementId: bigint
}

export default function OnchainAchievementOracleFeeds({ achievementId }: OnchainAchievementOracleFeedsProps) {
  const { address } = useAccount()
  const [oracleName, setOracleName] = useState('Chainlink')
  const [feedId, setFeedId] = useState('ETH/USD')
  const [price, setPrice] = useState('3421.50')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFeed = () => {
    if (!address || !feedId.trim()) return

    const payload = `ORACLE_FEED|oracle:${oracleName}|feed:${feedId}|price:${price}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-cyan-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔮 Oracle Feeds</h3>
      <p className="text-sm text-gray-600 mb-4">Attach oracle price snapshots for conditional reward calculations.</p>

      <div className="space-y-3 mb-4">
        <input value={oracleName} onChange={(e) => setOracleName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Oracle name" />
        <input value={feedId} onChange={(e) => setFeedId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Feed ID" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Price" />
      </div>

      <button
        onClick={recordFeed}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording feed...' : 'Record oracle feed'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          ✓ Oracle feed snapshot stored.
        </div>
      )}
    </section>
  )
}
