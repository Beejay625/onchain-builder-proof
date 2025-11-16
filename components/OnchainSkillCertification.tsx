'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainSkillCertification() {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [certificationLevel, setCertificationLevel] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const certifySkill = async () => {
    if (!address || !skillName) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Skill Certified: ${skillName} - Level ${certificationLevel}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Skill Certification</h2>
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
          placeholder="Certification level"
          value={certificationLevel}
          onChange={(e) => setCertificationLevel(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={certifySkill}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Certifying...' : 'Certify Skill'}
        </button>
        {isSuccess && <p className="text-green-600">Skill certified onchain!</p>}
      </div>
    </div>
  )
}

