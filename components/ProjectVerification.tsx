'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function ProjectVerification() {
  const [projectName, setProjectName] = useState('')
  const [projectURL, setProjectURL] = useState('')
  const [description, setDescription] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifyProject = async () => {
    if (!projectName.trim() || !projectURL.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'verifyProject',
        args: [projectName, projectURL, description],
      })
    } catch (error) {
      console.error('Project verification error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Verify Project</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My Awesome Project"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Project URL</label>
          <input
            type="url"
            value={projectURL}
            onChange={(e) => setProjectURL(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
        <button
          onClick={verifyProject}
          disabled={isPending}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending ? 'Verifying...' : 'Verify Project'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Project verified onchain
          </div>
        )}
      </div>
    </div>
  )
}
