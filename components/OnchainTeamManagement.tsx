'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainTeamManagementProps {
  achievementId: bigint
}

export default function OnchainTeamManagement({ achievementId }: OnchainTeamManagementProps) {
  const { address } = useAccount()
  const [teamName, setTeamName] = useState('')
  const [memberAddress, setMemberAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addTeamMember = async () => {
    if (!address || !teamName.trim() || !memberAddress.trim()) return
    
    const teamData = `TEAM_MANAGEMENT: ${teamName} - Member: ${memberAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, teamData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">👥 Onchain Builder Teams</h3>
      
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Team name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={memberAddress}
        onChange={(e) => setMemberAddress(e.target.value)}
        placeholder="Member wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={addTeamMember}
        disabled={isPending || isConfirming || !teamName.trim() || !memberAddress.trim()}
        className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Adding...' : 'Add Team Member'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Team member added onchain
        </div>
      )}
    </div>
  )
}

