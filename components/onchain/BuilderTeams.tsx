'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function BuilderTeams() {
  const { address, isConnected } = useAccount()
  const [teamName, setTeamName] = useState('')
  const [memberAddresses, setMemberAddresses] = useState('')
  const [teamDescription, setTeamDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainBuilderTeams')) {
    return null
  }

  const handleCreateTeam = async () => {
    if (!isConnected || !address || !teamName.trim() || !memberAddresses.trim()) return

    try {
      const members = memberAddresses.split(',').map((m) => m.trim()).filter(Boolean)
      const content = `Builder Team Created\nName: ${teamName}\nMembers: ${members.join(', ')}${teamDescription ? `\nDescription: ${teamDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Team creation failed:', error)
    }
  }

  return (
    <AppCard title="👥 Builder Teams" subtitle="Create and manage builder teams" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Member Addresses (comma-separated)</label>
          <textarea
            value={memberAddresses}
            onChange={(e) => setMemberAddresses(e.target.value)}
            placeholder="0x..., 0x..., 0x..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            placeholder="What does this team do?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateTeam}
          disabled={isPending || isConfirming || !isConnected || !teamName.trim() || !memberAddresses.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Team'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Builder team created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

