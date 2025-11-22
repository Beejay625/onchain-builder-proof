'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSocialGraphNetworkProps {
  achievementId: bigint
}

export default function OnchainAchievementSocialGraphNetwork({ achievementId }: OnchainAchievementSocialGraphNetworkProps) {
  const { address } = useAccount()
  const [networkType, setNetworkType] = useState('Lens Protocol')
  const [connectionCount, setConnectionCount] = useState('42')
  const [influenceScore, setInfluenceScore] = useState('0.68')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordNetwork = () => {
    if (!address || !networkType.trim()) return

    const payload = `SOCIAL_GRAPH|network:${networkType}|connections:${connectionCount}|influence:${influenceScore}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-fuchsia-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🕸️ Social Graph Network</h3>
      <p className="text-sm text-gray-600 mb-4">Map decentralized social connections to builder achievements.</p>

      <div className="space-y-3 mb-4">
        <input value={networkType} onChange={(e) => setNetworkType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Network type" />
        <input value={connectionCount} onChange={(e) => setConnectionCount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Connection count" />
        <input value={influenceScore} onChange={(e) => setInfluenceScore(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Influence score" />
      </div>

      <button
        onClick={recordNetwork}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-fuchsia-600 text-white rounded-lg font-semibold hover:bg-fuchsia-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record social graph'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-fuchsia-700 bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-3">
          ✓ Social graph network data stored.
        </div>
      )}
    </section>
  )
}
