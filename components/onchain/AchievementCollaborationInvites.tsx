'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCollaborationInvitesProps {
  achievementId: bigint
}

export default function AchievementCollaborationInvites({ achievementId }: AchievementCollaborationInvitesProps) {
  const { address, isConnected } = useAccount()
  const [inviteAddress, setInviteAddress] = useState('')
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor' | 'collaborator'>('collaborator')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementCollaborationInvites')) {
    return null
  }

  const handleSendInvite = async () => {
    if (!isConnected || !address || !inviteAddress.trim() || !inviteAddress.startsWith('0x')) return

    try {
      const content = `Collaboration Invite\nAchievement: #${achievementId.toString()}\nInvitee: ${inviteAddress}\nRole: ${inviteRole}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Invite failed:', error)
    }
  }

  return (
    <AppCard title="🤝 Achievement Collaboration Invites" subtitle="Invite others to collaborate on achievements" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Invitee Address</label>
          <input
            type="text"
            value={inviteAddress}
            onChange={(e) => setInviteAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as 'viewer' | 'editor' | 'collaborator')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="viewer">Viewer - Can view only</option>
            <option value="editor">Editor - Can edit content</option>
            <option value="collaborator">Collaborator - Full collaboration access</option>
          </select>
        </div>
        <button
          onClick={handleSendInvite}
          disabled={isPending || isConfirming || !isConnected || !inviteAddress.trim() || !inviteAddress.startsWith('0x')}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Sending...' : 'Send Invite'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Invite sent onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

