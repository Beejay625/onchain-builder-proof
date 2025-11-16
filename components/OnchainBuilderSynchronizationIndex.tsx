'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderSynchronizationIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const synchronizationIndex = Math.min(100, (userPosts?.length || 0) * 3.9)
  const synchronizationLevel = synchronizationIndex >= 70 ? 'Synchronized' :
                                synchronizationIndex >= 50 ? 'Synchronizing' :
                                synchronizationIndex >= 30 ? 'Aligning' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Synchronization Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{synchronizationIndex.toFixed(0)}</p>
          <p className="text-gray-600">Synchronization Index</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{synchronizationLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure synchronization of achievements.
        </p>
      </div>
    </div>
  )
}

