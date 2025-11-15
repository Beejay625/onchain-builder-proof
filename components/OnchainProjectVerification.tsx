'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainProjectVerification() {
  const { address } = useAccount()
  const [projectName, setProjectName] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [description, setDescription] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifyProject = async () => {
    if (!address || !projectName || !projectUrl) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Verified Project: ${projectName} - ${projectUrl} - ${description}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Project Verification</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="url"
          placeholder="Project URL"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-24"
        />
        <button
          onClick={verifyProject}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Project'}
        </button>
        {isSuccess && <p className="text-green-600">Project verified onchain!</p>}
      </div>
    </div>
  )
}

