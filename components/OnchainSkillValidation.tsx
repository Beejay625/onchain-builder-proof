'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainSkillValidation() {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [proofLink, setProofLink] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const validateSkill = async () => {
    if (!address || !skillName || !proofLink) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Skill Validated: ${skillName} - Proof: ${proofLink}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Skill Validation</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
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
          onClick={validateSkill}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Validating...' : 'Validate Skill'}
        </button>
        {isSuccess && <p className="text-green-600">Skill validated onchain!</p>}
      </div>
    </div>
  )
}

