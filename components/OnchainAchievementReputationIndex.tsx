'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationIndex() {
  const { address, isConnected } = useAccount()
  const [indexType, setIndexType] = useState('total')

  const { data: indexValue, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getReputationIndex',
    args: [indexType],
    query: {
      enabled: !!address && isConnected,
    },
  })

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📊 Reputation Index</h3>
        <p className="text-gray-600">Connect wallet to view index</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📊 Reputation Index</h3>
      <p className="text-gray-600 mb-4">
        Track reputation index value across platform onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Index Type</label>
          <select
            value={indexType}
            onChange={(e) => setIndexType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="total">Total Reputation</option>
            <option value="average">Average Reputation</option>
            <option value="median">Median Reputation</option>
          </select>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading index...</div>
        ) : indexValue !== undefined && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Reputation Index</p>
            <p className="text-3xl font-bold text-blue-600">{indexValue?.toString() || '0'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
