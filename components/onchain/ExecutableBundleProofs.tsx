'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ExecutableBundleProofs() {
  const { address, isConnected } = useAccount()
  const [bundleName, setBundleName] = useState('deployment-bundle-v3')
  const [sha, setSha] = useState('0xabc123')
  const [routes, setRoutes] = useState('mint + batchReward')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('executableBundleProofs')) {
    return null
  }

  const handleRecord = async () => {
    if (!isConnected || !address || !bundleName.trim() || !sha.trim()) return

    try {
      const content = `Executable Bundle
Name: ${bundleName}
SHA: ${sha}
Routes: ${routes}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Executable bundle proof failed:', error)
    }
  }

  return (
    <AppCard
      title="📦 Executable Bundle Proofs"
      subtitle="Fingerprint bundles before they touch privileged contracts."
      accent="indigo"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Bundle Name</label>
          <input
            type="text"
            value={bundleName}
            onChange={(e) => setBundleName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Content Hash</label>
          <input
            type="text"
            value={sha}
            onChange={(e) => setSha(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Routes</label>
          <input
            type="text"
            value={routes}
            onChange={(e) => setRoutes(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecord}
          disabled={isPending || isConfirming || !isConnected || !bundleName.trim() || !sha.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Anchoring...' : 'Anchor Bundle'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Bundle fingerprint recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

