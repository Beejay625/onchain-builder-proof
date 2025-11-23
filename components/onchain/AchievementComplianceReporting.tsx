'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementComplianceReportingProps {
  achievementId: bigint
}

export default function AchievementComplianceReporting({ achievementId }: AchievementComplianceReportingProps) {
  const { address, isConnected } = useAccount()
  const [reportType, setReportType] = useState<'regulatory' | 'security' | 'privacy' | 'audit'>('regulatory')
  const [reportContent, setReportContent] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementComplianceReporting')) {
    return null
  }

  const handleSubmitReport = async () => {
    if (!isConnected || !address || !reportContent.trim()) return

    try {
      const content = `Compliance Report\nAchievement: #${achievementId.toString()}\nType: ${reportType}\nContent: ${reportContent}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Compliance report failed:', error)
    }
  }

  return (
    <AppCard title="📊 Achievement Compliance Reporting" subtitle="Submit compliance reports for achievements" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as 'regulatory' | 'security' | 'privacy' | 'audit')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="regulatory">Regulatory</option>
            <option value="security">Security</option>
            <option value="privacy">Privacy</option>
            <option value="audit">Audit</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Content</label>
          <textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Enter compliance report details..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmitReport}
          disabled={isPending || isConfirming || !isConnected || !reportContent.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Compliance Report'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Compliance report submitted onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

