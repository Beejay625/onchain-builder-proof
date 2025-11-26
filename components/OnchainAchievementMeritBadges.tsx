'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMeritBadges() {
  const { address } = useAccount()
  const [skill, setSkill] = useState('')
  const [level, setLevel] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintMeritBadge = async () => {
    if (!address || !skill || !level) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`MERIT:${skill}:${level}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏅 Merit Badges</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Skill name"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        <button
          onClick={mintMeritBadge}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint Merit Badge'}
        </button>
        {isSuccess && <p className="text-green-600">Merit badge minted onchain!</p>}
      </div>
    </div>
  )
}





