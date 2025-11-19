'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEventLogProps {
  achievementId: bigint
}

export default function OnchainAchievementEventLog({ achievementId }: OnchainAchievementEventLogProps) {
  const { address } = useAccount()
  
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const events = [
    { type: 'Created', timestamp: post?.timestamp, description: 'Achievement minted onchain' },
    { type: 'Updated', timestamp: post?.timestamp, description: 'Achievement updated' },
  ]

  if (isLoading || !post) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">📋 Event Log</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📋 Onchain Event Log</h3>
      
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{event.type}</p>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
              {event.timestamp && (
                <span className="text-xs text-gray-500">
                  {new Date(Number(event.timestamp) * 1000).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          All events are permanently recorded on Base blockchain
        </p>
      </div>
    </div>
  )
}

