'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRoleBasedAccessProps {
  achievementId: bigint
}

export default function AchievementRoleBasedAccess({ achievementId }: AchievementRoleBasedAccessProps) {
  const { address, isConnected } = useAccount()
  const [role, setRole] = useState<'viewer' | 'editor' | 'moderator' | 'admin'>('viewer')
  const [userAddress, setUserAddress] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementRoleBasedAccess')) {
    return null
  }

  const handleAssignRole = async () => {
    if (!isConnected || !address || !userAddress.trim() || !userAddress.startsWith('0x')) return

    try {
      const content = `Role Assignment\nAchievement: #${achievementId.toString()}\nRole: ${role}\nUser: ${userAddress}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Role assignment failed:', error)
    }
  }

  return (
    <AppCard title="👥 Achievement Role-Based Access" subtitle="Assign roles for achievement access control" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'viewer' | 'editor' | 'moderator' | 'admin')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">User Address</label>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleAssignRole}
          disabled={isPending || isConfirming || !isConnected || !userAddress.trim() || !userAddress.startsWith('0x')}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Assigning...' : 'Assign Role'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Role assigned onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

