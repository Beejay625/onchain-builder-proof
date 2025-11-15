'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainSkillVerification() {
  const { address } = useAccount()
  const [skill, setSkill] = useState('')
  const [proof, setProof] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifySkill = async () => {
    if (!address || !skill || !proof) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Verified skill: ${skill} - Proof: ${proof}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Skill Verification</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Skill to verify"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Verification proof (URL, certificate, etc.)"
          value={proof}
          onChange={(e) => setProof(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-24"
        />
        <button
          onClick={verifySkill}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Skill'}
        </button>
        {isSuccess && <p className="text-green-600">Skill verified onchain!</p>}
      </div>
    </div>
  )
}

