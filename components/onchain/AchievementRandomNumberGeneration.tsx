'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRandomNumberGenerationProps {
  achievementId: bigint
}

export default function AchievementRandomNumberGeneration({ achievementId }: AchievementRandomNumberGenerationProps) {
  const { address, isConnected } = useAccount()
  const [rngType, setRngType] = useState<'vrf' | 'blockhash' | 'commit-reveal'>('vrf')
  const [randomValue, setRandomValue] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementRandomNumberGeneration')) {
    return null
  }

  const handleGenerateRandom = async () => {
    if (!isConnected || !address) return

    try {
      const generatedValue = randomValue || Math.floor(Math.random() * 1000000).toString()
      const content = `Random Number Generation\nAchievement: #${achievementId.toString()}\nType: ${rngType}\nValue: ${generatedValue}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Random number generation failed:', error)
    }
  }

  return (
    <AppCard title="🎲 Achievement Random Number Generation" subtitle="Track random number generation operations and verifications" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">RNG Type</label>
          <select
            value={rngType}
            onChange={(e) => setRngType(e.target.value as 'vrf' | 'blockhash' | 'commit-reveal')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="vrf">VRF (Verifiable Random Function)</option>
            <option value="blockhash">Block Hash</option>
            <option value="commit-reveal">Commit-Reveal</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Random Value (optional)</label>
          <input
            type="text"
            value={randomValue}
            onChange={(e) => setRandomValue(e.target.value)}
            placeholder="Leave empty to generate"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleGenerateRandom}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Generating...' : 'Generate Random Number'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Random number generated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

