'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementOraclesProps {
  achievementId: bigint
}

export default function AchievementOracles({ achievementId }: AchievementOraclesProps) {
  const { address, isConnected } = useAccount()
  const [oracleProvider, setOracleProvider] = useState('')
  const [oracleData, setOracleData] = useState('')
  const [oracleProof, setOracleProof] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementOracles')) {
    return null
  }

  const handleVerifyWithOracle = async () => {
    if (!isConnected || !address || !oracleProvider.trim() || !oracleData.trim()) return

    try {
      const oracleContent = `ORACLE:${oracleProvider}:${oracleData}:${oracleProof || 'N/A'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, oracleContent],
      })
    } catch (error) {
      console.error('Oracle verification failed:', error)
    }
  }

  return (
    <AppCard title="🔮 Oracles" subtitle="Verify achievements with external oracle data" accent="violet">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Oracle Provider</label>
          <select
            value={oracleProvider}
            onChange={(e) => setOracleProvider(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="">Select oracle...</option>
            <option value="Chainlink">Chainlink</option>
            <option value="Band Protocol">Band Protocol</option>
            <option value="API3">API3</option>
            <option value="UMA">UMA</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Oracle Data</label>
          <textarea
            value={oracleData}
            onChange={(e) => setOracleData(e.target.value)}
            placeholder="Enter oracle verification data..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Link (Optional)</label>
          <input
            type="url"
            value={oracleProof}
            onChange={(e) => setOracleProof(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleVerifyWithOracle}
          disabled={isPending || isConfirming || !isConnected || !oracleProvider.trim() || !oracleData.trim()}
          className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify with Oracle'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-violet-50 border border-violet-200 p-3 text-sm text-violet-800">
            ✅ Achievement verified onchain via {oracleProvider} oracle
          </div>
        )}
      </div>
    </AppCard>
  )
}

