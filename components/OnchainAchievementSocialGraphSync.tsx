'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSocialGraphSyncProps {
  achievementId: bigint
}

export default function OnchainAchievementSocialGraphSync({ achievementId }: OnchainAchievementSocialGraphSyncProps) {
  const { address } = useAccount()
  const [network, setNetwork] = useState('Lens')
  const [followers, setFollowers] = useState('1280')
  const [engagement, setEngagement] = useState('4.8% avg')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const syncGraph = () => {
    if (!address || !network.trim()) return

    const payload = `SOCIAL_GRAPH|network:${network}|followers:${followers}|engagement:${engagement}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-fuchsia-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🕸 Social Graph Sync</h3>
      <p className="text-sm text-gray-600 mb-4">Mirror decentralized social reach for each builder credential.</p>

      <div className="space-y-3 mb-4">
        <input value={network} onChange={(e) => setNetwork(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Network" />
        <input value={followers} onChange={(e) => setFollowers(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Followers" />
        <input value={engagement} onChange={(e) => setEngagement(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Engagement" />
      </div>

      <button
        onClick={syncGraph}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-fuchsia-600 text-white rounded-lg font-semibold hover:bg-fuchsia-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Syncing graph...' : 'Sync social graph'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-fuchsia-700 bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-3">
          ✓ Social graph metrics pinned for verifiers.
        </div>
      )}
    </section>
  )
}
