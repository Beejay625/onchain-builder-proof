'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementVerificationProps {
  achievementId: bigint
}

export default function OnchainAchievementVerification({ achievementId }: OnchainAchievementVerificationProps) {
  const { address, isConnected } = useAccount()
  const [verifierAddress, setVerifierAddress] = useState('')
  const [verificationProof, setVerificationProof] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const verifyAchievement = async () => {
    if (!isConnected || !address || !verifierAddress.trim() || !verificationProof.trim()) return

    try {
      const verificationData = `VERIFICATION:verifier:${verifierAddress}:proof:${verificationProof}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, verificationData],
      })
    } catch (error) {
      console.error('Verification failed:', error)
    }
  }

  return (
    <AppCard title="✓ Achievement Verification" subtitle="Verify achievement with proof" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verifier Address *</label>
          <input
            type="text"
            value={verifierAddress}
            onChange={(e) => setVerifierAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verification Proof *</label>
          <textarea
            value={verificationProof}
            onChange={(e) => setVerificationProof(e.target.value)}
            placeholder="Link to proof or evidence..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={verifyAchievement}
          disabled={isPending || isConfirming || !isConnected || !verifierAddress.trim() || !verificationProof.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Verification recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

