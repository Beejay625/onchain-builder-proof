'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toUtf8Bytes } from 'viem'

interface AchievementIPProtectionProps {
  achievementId: bigint
}

export default function AchievementIPProtection({ achievementId }: AchievementIPProtectionProps) {
  const { address, isConnected } = useAccount()
  const [ipContent, setIpContent] = useState('')
  const [ipHash, setIpHash] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementIPProtection')) {
    return null
  }

  const handleGenerateHash = () => {
    if (!ipContent.trim()) return
    const hash = keccak256(toUtf8Bytes(ipContent))
    setIpHash(hash)
  }

  const handleProtectIP = async () => {
    if (!isConnected || !address || !ipHash) return

    try {
      const protectionContent = `IPPROTECTION:${ipHash}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, protectionContent],
      })
    } catch (error) {
      console.error('IP protection failed:', error)
    }
  }

  return (
    <AppCard title="🛡️ IP Protection" subtitle="Protect intellectual property with hash verification" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">IP Content</label>
          <textarea
            value={ipContent}
            onChange={(e) => setIpContent(e.target.value)}
            placeholder="Enter your intellectual property content..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleGenerateHash}
          disabled={!ipContent.trim()}
          className="w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
        >
          Generate Hash
        </button>
        {ipHash && (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
            <p className="text-xs font-mono break-all">{ipHash}</p>
          </div>
        )}
        <button
          onClick={handleProtectIP}
          disabled={isPending || isConfirming || !isConnected || !ipHash}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Protecting...' : 'Protect IP onchain'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ IP hash protected onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

