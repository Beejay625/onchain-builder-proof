'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementReferrals() {
  const { address, isConnected } = useAccount()
  const [referralCode, setReferralCode] = useState('')
  const [referredAddress, setReferredAddress] = useState('')
  const [referralReward, setReferralReward] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainReferrals')) {
    return null
  }

  const handleTrackReferral = async () => {
    if (!isConnected || !address || !referralCode.trim() || !referredAddress) return

    try {
      const content = `Referral Tracking\nCode: ${referralCode}\nReferred: ${referredAddress}${referralReward ? `\nReward: ${referralReward}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Referral tracking failed:', error)
    }
  }

  return (
    <AppCard title="🧬 Achievement Referrals" subtitle="Track referral codes and rewards" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Referral Code</label>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="REF123..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Referred Address</label>
          <input
            type="text"
            value={referredAddress}
            onChange={(e) => setReferredAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward (optional)</label>
          <input
            type="text"
            value={referralReward}
            onChange={(e) => setReferralReward(e.target.value)}
            placeholder="e.g., 50 tokens"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleTrackReferral}
          disabled={isPending || isConfirming || !isConnected || !referralCode.trim() || !referredAddress}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track Referral'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Referral tracked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

