'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Trust Scores
 * Calculate trust scores based on achievement history
 */
export default function OnchainAchievementTrustScores() {
  const { address, isConnected } = useAccount()
  const [targetAddress, setTargetAddress] = useState('')

  const { data: trustScore, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTrustScore',
    args: targetAddress && targetAddress.startsWith('0x') ? [targetAddress as `0x${string}`] : address ? [address] : undefined,
    query: {
      enabled: !!address || (!!targetAddress && targetAddress.startsWith('0x')),
    },
  })

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🛡️ Trust Scores</h3>
        <p className="text-gray-600">Connect wallet to view trust scores</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🛡️ Trust Scores</h3>
      <p className="text-gray-600 mb-4">
        Calculate trust scores based on achievement history onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Address (optional)</label>
          <input
            type="text"
            value={targetAddress}
            onChange={(e) => setTargetAddress(e.target.value)}
            placeholder={address || "0x..."}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading trust score...</div>
        ) : trustScore !== undefined && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Trust Score</p>
            <p className="text-3xl font-bold text-blue-600">{trustScore?.toString() || '0'}</p>
            <p className="text-xs text-gray-500 mt-2">
              Based on achievement history, verification status, and community interactions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}





