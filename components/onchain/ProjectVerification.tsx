'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ProjectVerification() {
  const { address, isConnected } = useAccount()
  const [projectUrl, setProjectUrl] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [verificationType, setVerificationType] = useState<'dapp' | 'contract' | 'nft' | 'other'>('dapp')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainProjectVerification')) {
    return null
  }

  const handleVerify = async () => {
    if (!isConnected || !address || !projectUrl || !projectDescription.trim()) return

    try {
      const content = `Project Verification\nType: ${verificationType}\nURL: ${projectUrl}\nDescription: ${projectDescription}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Verification failed:', error)
    }
  }

  return (
    <AppCard title="✅ Project Verification" subtitle="Verify projects with URLs and descriptions" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project URL</label>
          <input
            type="text"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verification Type</label>
          <select
            value={verificationType}
            onChange={(e) => setVerificationType(e.target.value as 'dapp' | 'contract' | 'nft' | 'other')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="dapp">dApp</option>
            <option value="contract">Smart Contract</option>
            <option value="nft">NFT Collection</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe your project..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleVerify}
          disabled={isPending || isConfirming || !isConnected || !projectUrl || !projectDescription.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Project'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Project verification recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}


