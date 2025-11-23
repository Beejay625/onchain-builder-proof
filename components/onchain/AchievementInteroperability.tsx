'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementInteroperabilityProps {
  achievementId: bigint
}

export default function AchievementInteroperability({ achievementId }: AchievementInteroperabilityProps) {
  const { address, isConnected } = useAccount()
  const [protocol, setProtocol] = useState<'erc721' | 'erc1155' | 'erc20' | 'custom'>('erc721')
  const [standard, setStandard] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementInteroperability')) {
    return null
  }

  const handleSetInteroperability = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Interoperability\nAchievement: #${achievementId.toString()}\nProtocol: ${protocol}${standard ? `\nStandard: ${standard}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Interoperability setup failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Achievement Interoperability" subtitle="Enable interoperability with other protocols" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Protocol Standard</label>
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value as 'erc721' | 'erc1155' | 'erc20' | 'custom')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="erc721">ERC-721</option>
            <option value="erc1155">ERC-1155</option>
            <option value="erc20">ERC-20</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {protocol === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Standard</label>
            <input
              type="text"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              placeholder="Custom standard name"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        )}
        <button
          onClick={handleSetInteroperability}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Interoperability'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Interoperability configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

