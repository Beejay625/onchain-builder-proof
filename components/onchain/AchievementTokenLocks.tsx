'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTokenLocksProps {
  achievementId: bigint
}

export default function AchievementTokenLocks({ achievementId }: AchievementTokenLocksProps) {
  const { address, isConnected } = useAccount()
  const [lockAmount, setLockAmount] = useState('0')
  const [tokenSymbol, setTokenSymbol] = useState('BUILDER')
  const [unlockDate, setUnlockDate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTokenLocks')) {
    return null
  }

  const handleLockTokens = async () => {
    if (!isConnected || !address || !lockAmount.trim()) return

    try {
      const content = `Token Lock\nAchievement: #${achievementId.toString()}\nAmount: ${lockAmount} ${tokenSymbol}\nUnlock Date: ${unlockDate || 'tbd'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Token lock log failed:', error)
    }
  }

  return (
    <AppCard title="🔒 Token Locks" subtitle="Track token lockups with unlock schedules" accent="gray">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="text"
              value={lockAmount}
              onChange={(e) => setLockAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
            <input
              type="text"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unlock Date</label>
          <input
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleLockTokens}
          disabled={isPending || isConfirming || !isConnected || !lockAmount.trim()}
          className="w-full rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Token Lock'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Token lock recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

