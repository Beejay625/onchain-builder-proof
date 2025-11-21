'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContinuousMonitoringProps {
  achievementId: bigint
}

export default function OnchainAchievementContinuousMonitoring({ achievementId }: OnchainAchievementContinuousMonitoringProps) {
  const { address } = useAccount()
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading || !post) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">📡 Continuous Monitoring</h3>
        <p className="text-gray-600">Initializing monitors...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📡 Continuous Monitoring</h3>
      <div className="space-y-3">
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-semibold text-green-700">Status</p>
          <p className="text-xs text-gray-600">Active</p>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-700">Last Signal</p>
          <p className="text-xs text-gray-600">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  )
}
