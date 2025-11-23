'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRenewalProps {
  achievementId: bigint
}

export default function OnchainAchievementRenewal({ achievementId }: OnchainAchievementRenewalProps) {
  const { address, isConnected } = useAccount()
  const [renewalPeriod, setRenewalPeriod] = useState(365)
  const [renewalNote, setRenewalNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const renewAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const expiryDate = new Date(Date.now() + renewalPeriod * 24 * 60 * 60 * 1000)
      const renewalData = `RENEWAL:${Date.now()}:${renewalPeriod}:${expiryDate.toISOString()}:${renewalNote || 'Renewed'}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, renewalData],
      })
    } catch (error) {
      console.error('Renewal failed:', error)
    }
  }

  const expiryDate = new Date(Date.now() + renewalPeriod * 24 * 60 * 60 * 1000)

  return (
    <AppCard title="🔄 Achievement Renewal" subtitle="Extend achievement validity period" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Renewal Period (days)</label>
          <input
            type="number"
            value={renewalPeriod}
            onChange={(e) => setRenewalPeriod(Number(e.target.value))}
            min={1}
            max={3650}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Expires: {expiryDate.toLocaleDateString()}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Renewal Note (optional)</label>
          <input
            type="text"
            value={renewalNote}
            onChange={(e) => setRenewalNote(e.target.value)}
            placeholder="Why are you renewing?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={renewAchievement}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Renewing...' : 'Renew Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Achievement renewed until {expiryDate.toLocaleDateString()}
          </div>
        )}
      </div>
    </AppCard>
  )
}

