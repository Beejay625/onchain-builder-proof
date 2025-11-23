'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPermissionManagementProps {
  achievementId: bigint
}

export default function AchievementPermissionManagement({ achievementId }: AchievementPermissionManagementProps) {
  const { address, isConnected } = useAccount()
  const [permissionType, setPermissionType] = useState<'read' | 'write' | 'admin'>('read')
  const [granteeAddress, setGranteeAddress] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementPermissionManagement')) {
    return null
  }

  const handleGrantPermission = async () => {
    if (!isConnected || !address || !granteeAddress.trim() || !granteeAddress.startsWith('0x')) return

    try {
      const content = `Permission Grant\nAchievement: #${achievementId.toString()}\nType: ${permissionType}\nGrantee: ${granteeAddress}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Permission grant failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Achievement Permission Management" subtitle="Manage permissions for achievements" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Permission Type</label>
          <select
            value={permissionType}
            onChange={(e) => setPermissionType(e.target.value as 'read' | 'write' | 'admin')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grantee Address</label>
          <input
            type="text"
            value={granteeAddress}
            onChange={(e) => setGranteeAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleGrantPermission}
          disabled={isPending || isConfirming || !isConnected || !granteeAddress.trim() || !granteeAddress.startsWith('0x')}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Granting...' : 'Grant Permission'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Permission granted onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

