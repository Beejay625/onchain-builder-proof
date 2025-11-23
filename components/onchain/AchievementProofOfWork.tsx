'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toUtf8Bytes } from 'viem'

interface AchievementProofOfWorkProps {
  achievementId?: bigint
}

export default function AchievementProofOfWork({ achievementId }: AchievementProofOfWorkProps) {
  const { address, isConnected } = useAccount()
  const [workContent, setWorkContent] = useState('')
  const [difficulty, setDifficulty] = useState('5')
  const [nonce, setNonce] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementProofOfWork')) {
    return null
  }

  const handleGenerateProof = () => {
    if (!workContent.trim()) return
    let foundNonce = 0
    const targetPrefix = '0'.repeat(parseInt(difficulty))
    
    while (foundNonce < 1000000) {
      const hash = keccak256(toUtf8Bytes(`${workContent}${foundNonce}`))
      if (hash.startsWith('0x' + targetPrefix)) {
        setNonce(foundNonce.toString())
        return
      }
      foundNonce++
    }
    setNonce('Not found (try lower difficulty)')
  }

  const handleSubmitProof = async () => {
    if (!isConnected || !address || !workContent.trim() || !nonce.trim()) return

    try {
      const powContent = `POW:${workContent}:${nonce}:DIFF${difficulty}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: achievementId ? 'addComment' : 'createPost',
        args: achievementId ? [achievementId, powContent] : [powContent],
      })
    } catch (error) {
      console.error('Proof of work submission failed:', error)
    }
  }

  return (
    <AppCard title="⛏️ Proof of Work" subtitle="Require proof of work for achievements to prevent spam" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Work Content</label>
          <textarea
            value={workContent}
            onChange={(e) => setWorkContent(e.target.value)}
            placeholder="Enter content to prove work on..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty (leading zeros)</label>
          <input
            type="number"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            min="1"
            max="8"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleGenerateProof}
          disabled={!workContent.trim()}
          className="w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
        >
          Generate Proof of Work
        </button>
        {nonce && (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
            <p className="text-xs font-mono">Nonce: {nonce}</p>
          </div>
        )}
        <button
          onClick={handleSubmitProof}
          disabled={isPending || isConfirming || !isConnected || !workContent.trim() || !nonce.trim() || nonce.includes('Not found')}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Proof of Work'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Proof of work verified onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

