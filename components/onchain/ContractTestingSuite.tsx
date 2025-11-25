'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ContractTestingSuite() {
  const { address, isConnected } = useAccount()
  const [framework, setFramework] = useState('Foundry')
  const [coverage, setCoverage] = useState('92')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('contractTestingSuite')) {
    return null
  }

  const handleRecord = async () => {
    if (!isConnected || !address || !framework.trim()) return
    try {
      const content = `Contract Testing
Framework: ${framework}
Coverage: ${coverage}%
Notes: ${notes || 'n/a'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Contract testing log failed:', error)
    }
  }

  return (
    <AppCard title="🧪 Contract Testing Suite" subtitle="Attach coverage + framework evidence per deployment" accent="emerald">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Framework</label>
            <input
              type="text"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Coverage (%)</label>
            <input
              type="number"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecord}
          disabled={isPending || isConfirming || !isConnected || !framework.trim()}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Test Run'}
        </button>
        {isConfirmed && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">✅ Test suite recorded</div>}
      </div>
    </AppCard>
  )
}

