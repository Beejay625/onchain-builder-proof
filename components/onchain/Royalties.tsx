'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface RoyaltiesProps {
  achievementId: bigint
}

export default function Royalties({ achievementId }: RoyaltiesProps) {
  const { address, isConnected } = useAccount()
  const [royaltyRate, setRoyaltyRate] = useState('5')
  const [royaltyRecipient, setRoyaltyRecipient] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainRoyalties')) {
    return null
  }

  const handleConfigureRoyalties = async () => {
    if (!isConnected || !address || !royaltyRate || !royaltyRecipient) return

    try {
      const content = `Royalty Configuration\nAchievement: #${achievementId.toString()}\nRate: ${royaltyRate}%\nRecipient: ${royaltyRecipient}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Royalty configuration failed:', error)
    }
  }

  return (
    <AppCard title="💰 Royalties" subtitle="Configure royalty rates for achievements" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Royalty Rate (%)</label>
          <input
            type="number"
            value={royaltyRate}
            onChange={(e) => setRoyaltyRate(e.target.value)}
            min="0"
            max="100"
            step="0.1"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Royalty Recipient Address</label>
          <input
            type="text"
            value={royaltyRecipient}
            onChange={(e) => setRoyaltyRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleConfigureRoyalties}
          disabled={isPending || isConfirming || !isConnected || !royaltyRate || !royaltyRecipient}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Configuring...' : 'Configure Royalties'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Royalty configuration recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

