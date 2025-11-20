'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementProjectVerificationProps {
  achievementId: bigint
}

export default function OnchainAchievementProjectVerification({ achievementId }: OnchainAchievementProjectVerificationProps) {
  const { address } = useAccount()
  const [projectUrl, setProjectUrl] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const verifyProject = async () => {
    if (!address || !projectUrl.trim()) return
    
    const projectData = `PROJECT_VERIFICATION: ${projectUrl}${projectDescription ? ` | ${projectDescription}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, projectData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Project Verification</h3>
      
      <input
        type="url"
        value={projectUrl}
        onChange={(e) => setProjectUrl(e.target.value)}
        placeholder="Project URL"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        placeholder="Project description (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={verifyProject}
        disabled={isPending || isConfirming || !projectUrl.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Verifying...' : 'Verify Project Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Project verified onchain
        </div>
      )}
    </div>
  )
}
