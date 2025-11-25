'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementAccessControlProps {
  achievementId: bigint
}

export default function OnchainAchievementAccessControl({ achievementId }: OnchainAchievementAccessControlProps) {
  const { address, isConnected } = useAccount()
  const [accessLevel, setAccessLevel] = useState<'public' | 'private' | 'restricted'>('public')
  const [allowedAddresses, setAllowedAddresses] = useState('')
  const [accessReason, setAccessReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const setAccess = async () => {
    if (!isConnected || !address || !accessReason.trim()) return

    try {
      const payload = `ACCESS_CONTROL:level:${accessLevel}:addresses:${allowedAddresses || 'n/a'}:reason:${accessReason}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Access control failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Access Control" subtitle="Configure access levels and permissions" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value as typeof accessLevel)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="restricted">Restricted</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Addresses (optional)</label>
          <input
            type="text"
            value={allowedAddresses}
            onChange={(e) => setAllowedAddresses(e.target.value)}
            placeholder="Comma-separated: 0x...,0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access Reason *</label>
          <textarea
            value={accessReason}
            onChange={(e) => setAccessReason(e.target.value)}
            rows={2}
            placeholder="Why this access level?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={setAccess}
          disabled={isPending || isConfirming || !isConnected || !accessReason.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Access Control'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Access control configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
