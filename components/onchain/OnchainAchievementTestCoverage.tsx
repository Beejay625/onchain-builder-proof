'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTestCoverageProps {
  achievementId: bigint
}

export default function OnchainAchievementTestCoverage({ achievementId }: OnchainAchievementTestCoverageProps) {
  const { address, isConnected } = useAccount()
  const [coveragePercentage, setCoveragePercentage] = useState('')
  const [testType, setTestType] = useState('')
  const [testReport, setTestReport] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordCoverage = async () => {
    if (!isConnected || !address || !coveragePercentage.trim() || !testType.trim()) return

    try {
      const payload = `TEST_COVERAGE:percentage:${coveragePercentage}:type:${testType}:report:${testReport || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Test coverage failed:', error)
    }
  }

  return (
    <AppCard title="🧪 Test Coverage" subtitle="Record test coverage metrics and reports" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Percentage *</label>
          <input
            type="text"
            value={coveragePercentage}
            onChange={(e) => setCoveragePercentage(e.target.value)}
            placeholder="85%"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Type *</label>
          <input
            type="text"
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            placeholder="Unit, Integration, E2E"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Report Link (optional)</label>
          <input
            type="text"
            value={testReport}
            onChange={(e) => setTestReport(e.target.value)}
            placeholder="Coverage report URL"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordCoverage}
          disabled={isPending || isConfirming || !isConnected || !coveragePercentage.trim() || !testType.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Test Coverage'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Test coverage recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
