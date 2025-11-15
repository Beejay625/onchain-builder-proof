'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

export default function OnchainSkillEndorsement() {
  const { address } = useAccount()
  const [skill, setSkill] = useState('')
  const [endorser, setEndorser] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleEndorse = async () => {
    if (!address || !skill || !endorser) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Endorsed ${skill} skill for ${endorser}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Skill Endorsement</h2>
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
          placeholder="Endorser address"
          value={endorser}
          onChange={(e) => setEndorser(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleEndorse}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Endorsing...' : 'Endorse Skill'}
        </button>
        {isSuccess && <p className="text-green-600">Skill endorsed onchain!</p>}
      </div>
    </div>
  )
}

