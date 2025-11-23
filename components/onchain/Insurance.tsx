'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface InsuranceProps {
  achievementId: bigint
}

export default function Insurance({ achievementId }: InsuranceProps) {
  const { address, isConnected } = useAccount()
  const [insuranceProvider, setInsuranceProvider] = useState('')
  const [coverageAmount, setCoverageAmount] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainInsurance')) {
    return null
  }

  const handleInsure = async () => {
    if (!isConnected || !address || !insuranceProvider.trim() || !coverageAmount) return

    try {
      const content = `Achievement Insurance\nAchievement: #${achievementId.toString()}\nProvider: ${insuranceProvider}\nCoverage: ${coverageAmount}${policyNumber ? `\nPolicy: ${policyNumber}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Insurance registration failed:', error)
    }
  }

  return (
    <AppCard title="🛡️ Insurance" subtitle="Insure achievements onchain" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
          <input
            type="text"
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
            placeholder="Provider name..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount</label>
          <input
            type="text"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            placeholder="e.g., 1 ETH, 1000 tokens"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number (optional)</label>
          <input
            type="text"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            placeholder="POL-123..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleInsure}
          disabled={isPending || isConfirming || !isConnected || !insuranceProvider.trim() || !coverageAmount}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Registering...' : 'Register Insurance'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Insurance registered onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

