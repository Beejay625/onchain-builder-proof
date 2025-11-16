'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSkillVerification() {
  const { address } = useAccount()
  const [skill, setSkill] = useState('')
  const [proofLink, setProofLink] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifySkill = async () => {
    if (!address || !skill || !proofLink) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`SKILL_VERIFY: ${skill} - ${proofLink}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Skill Verification</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Skill name"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Proof link"
          value={proofLink}
          onChange={(e) => setProofLink(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={verifySkill}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Skill'}
        </button>
        {isSuccess && <p className="text-green-600">Skill verified onchain!</p>}
      </div>
    </div>
  )
}

