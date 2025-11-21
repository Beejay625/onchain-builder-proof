'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementHistoricalProofs() {
  const { isConnected } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  const { data, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getHistoricalProofs',
    args: achievementId ? [BigInt(achievementId)] : undefined,
    query: { enabled: !!achievementId && isConnected },
  })

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Historical Proofs</h2>
      <input
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="Achievement ID"
        value={achievementId}
        onChange={(e) => setAchievementId(e.target.value)}
      />
      {!isConnected && <p className="text-gray-500">Connect wallet to view data.</p>}
      {isConnected && isLoading && <p className="text-gray-500">Loading...</p>}
      {isConnected && !isLoading && Array.isArray(data) && (
        <ul className="space-y-2">
          {data.map((hash: string, idx: number) => (
            <li key={idx} className="border rounded-lg p-3 font-mono text-xs break-all">
              {hash}
            </li>
          ))}
          {data.length === 0 && <li className="text-gray-500">No proofs yet.</li>}
        </ul>
      )}
    </div>
  )
}
