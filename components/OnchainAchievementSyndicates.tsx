'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Syndicates
 * Form achievement syndicates for collective ownership
 */
export default function OnchainAchievementSyndicates() {
  const { address, isConnected } = useAccount()
  const [syndicateName, setSyndicateName] = useState('')
  const [members, setMembers] = useState<string[]>([''])

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const addMember = () => {
    setMembers([...members, ''])
  }

  const updateMember = (index: number, value: string) => {
    const newMembers = [...members]
    newMembers[index] = value
    setMembers(newMembers)
  }

  const handleCreateSyndicate = async () => {
    if (!isConnected || !address) return
    
    const validMembers = members.filter(m => m.startsWith('0x') && m.length === 42)
    if (validMembers.length === 0) {
      alert('Please add at least one member')
      return
    }

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createAchievementSyndicate',
        args: [syndicateName, validMembers],
      })
    } catch (error) {
      console.error('Error creating syndicate:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">👥 Achievement Syndicates</h3>
        <p className="text-gray-600">Connect wallet to create syndicate</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">👥 Achievement Syndicates</h3>
      <p className="text-gray-600 mb-4">
        Form achievement syndicates for collective ownership onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Syndicate Name</label>
          <input
            type="text"
            value={syndicateName}
            onChange={(e) => setSyndicateName(e.target.value)}
            placeholder="Enter syndicate name"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Members</label>
          {members.map((member, index) => (
            <input
              key={index}
              type="text"
              value={member}
              onChange={(e) => updateMember(index, e.target.value)}
              placeholder="0x..."
              className="w-full p-2 border rounded-lg mb-2"
            />
          ))}
          <button
            onClick={addMember}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Member
          </button>
        </div>

        <button
          onClick={handleCreateSyndicate}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : '👥 Create Syndicate'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Syndicate created successfully
          </div>
        )}
      </div>
    </div>
  )
}





