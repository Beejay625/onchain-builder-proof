'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementProofOfPracticeProps {
  achievementId: bigint
}

export default function OnchainAchievementProofOfPractice({ achievementId }: OnchainAchievementProofOfPracticeProps) {
  const { address } = useAccount()
  const [practiceHours, setPracticeHours] = useState('')
  const [practiceType, setPracticeType] = useState('coding')
  const [practiceEvidence, setPracticeEvidence] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const recordPractice = async () => {
    if (!address || !practiceHours.trim()) return
    
    const practiceData = `PROOF_OF_PRACTICE:type:${practiceType}:hours:${practiceHours.trim()}:evidence:${practiceEvidence.trim() || 'none'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, practiceData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏰ Proof of Practice</h3>
      
      <select
        value={practiceType}
        onChange={(e) => setPracticeType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="coding">Coding</option>
        <option value="design">Design</option>
        <option value="research">Research</option>
        <option value="writing">Writing</option>
        <option value="testing">Testing</option>
      </select>
      
      <input
        type="number"
        step="0.1"
        value={practiceHours}
        onChange={(e) => setPracticeHours(e.target.value)}
        placeholder="Practice hours"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={practiceEvidence}
        onChange={(e) => setPracticeEvidence(e.target.value)}
        placeholder="Evidence link (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={recordPractice}
        disabled={isPending || isConfirming || !practiceHours.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Practice Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Practice recorded onchain
        </div>
      )}
    </div>
  )
}
