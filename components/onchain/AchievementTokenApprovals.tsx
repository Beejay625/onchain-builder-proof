'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTokenApprovalsProps {
  achievementId: bigint
}

export default function AchievementTokenApprovals({ achievementId }: AchievementTokenApprovalsProps) {
  const { address, isConnected } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')
  const [spenderAddress, setSpenderAddress] = useState('')
  const [allowance, setAllowance] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTokenApprovals')) {
    return null
  }

  const handleRecordApproval = async () => {
    if (!isConnected || !address || !tokenAddress.trim() || !spenderAddress.trim() || !allowance.trim()) return

    try {
      const content = `Token Approval\nAchievement: #${achievementId.toString()}\nToken: ${tokenAddress}\nSpender: ${spenderAddress}\nAllowance: ${allowance}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Token approval log failed:', error)
    }
  }

  return (
    <AppCard title="✅ Token Approvals" subtitle="Capture ERC20 allowance approvals with spender context" accent="green">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Spender Address</label>
            <input
              type="text"
              value={spenderAddress}
              onChange={(e) => setSpenderAddress(e.target.value)}
              placeholder="0x..."
              className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allowance</label>
          <input
            type="text"
            value={allowance}
            onChange={(e) => setAllowance(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordApproval}
          disabled={isPending || isConfirming || !isConnected || !tokenAddress.trim() || !spenderAddress.trim() || !allowance.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Token Approval'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Token approval recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

