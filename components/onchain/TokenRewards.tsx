'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface TokenRewardsProps {
  achievementId: bigint
}

export default function TokenRewards({ achievementId }: TokenRewardsProps) {
  const { address, isConnected } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [tokenAmount, setTokenAmount] = useState('100')
  const [tokenAddress, setTokenAddress] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainTokenRewards')) {
    return null
  }

  const handleDistributeRewards = async () => {
    if (!isConnected || !address || !recipientAddress || !tokenAmount) return

    try {
      const content = `Token Reward Distribution\nAchievement: #${achievementId.toString()}\nRecipient: ${recipientAddress}\nAmount: ${tokenAmount}${tokenAddress ? `\nToken: ${tokenAddress}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Reward distribution failed:', error)
    }
  }

  return (
    <AppCard title="🪙 Token Rewards" subtitle="Distribute token rewards for achievements" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Amount</label>
          <input
            type="text"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Address (optional)</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleDistributeRewards}
          disabled={isPending || isConfirming || !isConnected || !recipientAddress || !tokenAmount}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Distributing...' : 'Distribute Rewards'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Token reward distribution recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}





