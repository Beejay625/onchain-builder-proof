'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBuilderInsuranceProps {
  achievementId: bigint
}

export default function OnchainAchievementBuilderInsurance({ achievementId }: OnchainAchievementBuilderInsuranceProps) {
  const { address } = useAccount()
  const [provider, setProvider] = useState('Nexus Mutual')
  const [coverage, setCoverage] = useState('25000 DAI')
  const [policyId, setPolicyId] = useState('POL-77821')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const registerPolicy = () => {
    if (!address || !provider.trim()) return

    const payload = `BUILDER_INSURANCE|provider:${provider}|coverage:${coverage}|policy:${policyId}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-red-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🛡 Builder Insurance</h3>
      <p className="text-sm text-gray-600 mb-4">Capture parametric insurance policies protecting deliverables.</p>

      <div className="space-y-3 mb-4">
        <input value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Provider" />
        <input value={coverage} onChange={(e) => setCoverage(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Coverage" />
        <input value={policyId} onChange={(e) => setPolicyId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Policy ID" />
      </div>

      <button
        onClick={registerPolicy}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Registering policy...' : 'Register builder policy'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          ✓ Insurance policy reference committed.
        </div>
      )}
    </section>
  )
}
