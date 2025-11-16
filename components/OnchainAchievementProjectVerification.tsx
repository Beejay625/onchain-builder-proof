'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProjectVerification() {
  const { address } = useAccount()
  const [projectUrl, setProjectUrl] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifyProject = async () => {
    if (!address || !projectUrl) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`PROJECT_VERIFY: ${projectUrl}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Project Verification</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project URL"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={verifyProject}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Project'}
        </button>
        {isSuccess && <p className="text-green-600">Project verified onchain!</p>}
      </div>
    </div>
  )
}

