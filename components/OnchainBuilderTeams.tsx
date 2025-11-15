'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

export default function OnchainBuilderTeams() {
  const { address } = useAccount()
  const [teamName, setTeamName] = useState('')
  const [memberAddress, setMemberAddress] = useState('')
  const [members, setMembers] = useState<string[]>([])
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addMember = () => {
    if (memberAddress && !members.includes(memberAddress)) {
      setMembers([...members, memberAddress])
      setMemberAddress('')
    }
  }

  const createTeam = async () => {
    if (!address || !teamName || members.length === 0) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Team Created: ${teamName} with ${members.length} members`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Builder Teams</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Member address"
            value={memberAddress}
            onChange={(e) => setMemberAddress(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={addMember}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Add
          </button>
        </div>
        {members.length > 0 && (
          <div className="space-y-1">
            {members.map((member, idx) => (
              <div key={idx} className="p-2 bg-gray-50 rounded flex justify-between">
                <span>{truncateAddress(member)}</span>
                <button
                  onClick={() => setMembers(members.filter((_, i) => i !== idx))}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={createTeam}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Team'}
        </button>
        {isSuccess && <p className="text-green-600">Team created onchain!</p>}
      </div>
    </div>
  )
}

