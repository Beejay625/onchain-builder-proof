'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationDeflation() {
  const { address, isConnected } = useAccount()

  const { data: deflationRate, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getReputationDeflationRate',
    query: {
      enabled: isConnected,
    },
  })

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📉 Reputation Deflation</h3>
        <p className="text-gray-600">Connect wallet to view deflation</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📉 Reputation Deflation</h3>
      <p className="text-gray-600 mb-4">
        Track reputation deflation mechanisms onchain
      </p>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading deflation rate...</div>
        ) : deflationRate !== undefined && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Deflation Rate</p>
            <p className="text-3xl font-bold text-blue-600">{deflationRate?.toString() || '0'}%</p>
          </div>
        )}
      </div>
    </div>
  )
}
