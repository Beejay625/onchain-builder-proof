'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Reputation Oracle
 * Pull reputation from external oracles and aggregate onchain
 */
export default function OnchainAchievementReputationOracle() {
  const { address, isConnected } = useAccount()
  const [oracleAddress, setOracleAddress] = useState('')
  const [reputationScore, setReputationScore] = useState<bigint | null>(null)

  const { data: oracleReputation, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getOracleReputation',
    args: address && oracleAddress ? [address, oracleAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!address && !!oracleAddress && oracleAddress.startsWith('0x'),
    },
  })

  const handleFetchReputation = () => {
    if (oracleReputation) {
      setReputationScore(oracleReputation as bigint)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔮 Reputation Oracle</h3>
        <p className="text-gray-600">Connect wallet to fetch oracle reputation</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔮 Onchain Reputation Oracle</h3>
      <p className="text-gray-600 mb-4">
        Pull reputation from external oracles and aggregate onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Oracle Address</label>
          <input
            type="text"
            value={oracleAddress}
            onChange={(e) => setOracleAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleFetchReputation}
          disabled={isLoading || !oracleAddress}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Fetching...' : '🔮 Fetch Oracle Reputation'}
        </button>

        {reputationScore !== null && (
          <div className="p-3 bg-blue-50 text-blue-800 rounded-lg">
            <p className="font-semibold">Oracle Reputation Score:</p>
            <p className="text-2xl font-bold">{reputationScore.toString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}
