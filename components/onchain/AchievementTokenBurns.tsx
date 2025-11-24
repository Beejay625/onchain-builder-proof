'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTokenBurnsProps {
  achievementId: bigint
}

export default function AchievementTokenBurns({ achievementId }: AchievementTokenBurnsProps) {
  const { address, isConnected } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')
  const [burnAmount, setBurnAmount] = useState('')
  const [reason, setReason] = useState('supply-rebalancing')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTokenBurns')) {
    return null
  }

  const handleRecordBurn = async () => {
    if (!isConnected || !address || !tokenAddress.trim() || !burnAmount.trim()) return

    try {
      const content = `Token Burn\nAchievement: #${achievementId.toString()}\nToken: ${tokenAddress}\nAmount: ${burnAmount}\nReason: ${reason}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Token burn log failed:', error)
    }
  }

  return (
    <AppCard title="🔥 Token Burns" subtitle="Track token burn operations for ERC20 assets" accent="red">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Token Address</label>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="0x..."
              className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Burn Amount</label>
            <input
              type="text"
              value={burnAmount}
              onChange={(e) => setBurnAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordBurn}
          disabled={isPending || isConfirming || !isConnected || !tokenAddress.trim() || !burnAmount.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Token Burn'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Token burn recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

