'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTokenTransfersProps {
  achievementId: bigint
}

export default function AchievementTokenTransfers({ achievementId }: AchievementTokenTransfersProps) {
  const { address, isConnected } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTokenTransfers')) {
    return null
  }

  const handleRecordTransfer = async () => {
    if (!isConnected || !address || !tokenAddress.trim() || !toAddress.trim() || !transferAmount.trim()) return

    try {
      const content = `Token Transfer\nAchievement: #${achievementId.toString()}\nToken: ${tokenAddress}\nRecipient: ${toAddress}\nAmount: ${transferAmount}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Token transfer log failed:', error)
    }
  }

  return (
    <AppCard title="📤 Token Transfers" subtitle="Track token transfer proofs for ERC20 assets" accent="blue">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
              className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Amount</label>
          <input
            type="text"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordTransfer}
          disabled={isPending || isConfirming || !isConnected || !tokenAddress.trim() || !toAddress.trim() || !transferAmount.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Token Transfer'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Token transfer recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

