'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AccessControlProps {
  achievementId: bigint
}

export default function AccessControl({ achievementId }: AccessControlProps) {
  const { address, isConnected } = useAccount()
  const [accessLevel, setAccessLevel] = useState<'public' | 'private' | 'restricted'>('public')
  const [allowedAddresses, setAllowedAddresses] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAccessControl')) {
    return null
  }

  const handleSetAccess = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Access Control\nAchievement: #${achievementId.toString()}\nLevel: ${accessLevel}${allowedAddresses ? `\nAllowed: ${allowedAddresses}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Access control update failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Access Control" subtitle="Control who can access achievements" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value as 'public' | 'private' | 'restricted')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="restricted">Restricted</option>
          </select>
        </div>
        {accessLevel === 'restricted' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Addresses (comma-separated)</label>
            <textarea
              value={allowedAddresses}
              onChange={(e) => setAllowedAddresses(e.target.value)}
              placeholder="0x..., 0x..."
              rows={2}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            />
          </div>
        )}
        <button
          onClick={handleSetAccess}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Access Control'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Access control updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

