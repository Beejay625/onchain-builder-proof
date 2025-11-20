'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBuilderTeamsProps {
  achievementId: bigint
}

export default function OnchainAchievementBuilderTeams({ achievementId }: OnchainAchievementBuilderTeamsProps) {
  const { address } = useAccount()
  const [teamName, setTeamName] = useState('')
  const [teamMembers, setTeamMembers] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createTeam = async () => {
    if (!address || !teamName.trim()) return
    
    const teamData = `BUILDER_TEAM: ${teamName}${teamMembers ? ` | members: ${teamMembers}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, teamData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">👥 Builder Teams</h3>
      
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Team name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={teamMembers}
        onChange={(e) => setTeamMembers(e.target.value)}
        placeholder="Team member addresses (one per line)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
        rows={4}
      />
      
      <button
        onClick={createTeam}
        disabled={isPending || isConfirming || !teamName.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Team Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Team created onchain
        </div>
      )}
    </div>
  )
}
